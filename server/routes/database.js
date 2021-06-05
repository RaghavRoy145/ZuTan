const express = require('express');
const { requireLogin } = require('../middleware/auth');
const User = require('../models/User');
const Database = require('../models/Database');
const axios = require('axios');
const format = require('pg-format');

const router = express.Router();

router.get('/', (req, res) => res.send('Test user'));

// @route   POST /api/database/create
// @desc    Creates a database instance
// access   Private

const spawnServerRoutes = {
    'sql': 'http://34.197.98.169:5000/createPostgresDatabase',
    'mongo': 'http://34.197.98.169:5000/createMongoDatabase'
}

const addTableRoute = 'http://34.197.98.169:5000/createTable';

router.post('/create', requireLogin(true), async (req, res) => {
	const { name, type } = req.body;
	try {
        const user = req.user;
		const db = new Database({
			name,
			type,
            user: req.id
		});
		await db.save();
        const response = await axios.post(spawnServerRoutes[type], {id: db._id}, {});
        const dbs = [db._id, ...user.databases];
        await User.findOneAndUpdate({ _id: req.id }, { databases: dbs });
        res.status(201).json({ message: 'Database succesfully created!', id: db._id });
	} catch (err) {
		if (err.name === 'ValidationError') {
			for (const field in err.errors)
				return res.status(400).json({ message: err.errors[field].properties.message });
		}
        console.log(err);
		return res.status(500).json({message: 'Server Error'});
	}
});

router.post('/retrieve', requireLogin(true), async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.id })
            .populate('databases');
        return res.status(200).json({
            databases: user.databases
        })
    } catch (err) {
        return res.status(500).json({message: 'Server Error'});
    }
})

router.post('/getDb', requireLogin(true), async (req,  res) => {
    const {id} = req.body;
    try {
        if(!id) return res.status(400).json({message: "Database ID required"});
        const db = await Database.findById(id);
        if(db.user != req.id) return res.status(403).json({message: "You do not have permission to view this database"});
        return res.status(200).json({
            database: db
        })
    } catch(err) {
        return res.status(500).json({message: 'Server Error'});
    }
})

router.post('/addTable', requireLogin(true), async (req, res) => {
    const {table, id} = req.body;
    try {
        const data = {
            databaseId: id,
            tableDetails: table
        };
        const db = await Database.findById(id);
        if(!db) return res.status(400).json({message: "Please provide a valid db id"});
        const response = await axios.post(addTableRoute, data, {});
        const tables = db.tables;
        tables.push(table);
        await Database.findOneAndUpdate({ _id: id }, { tables });
        return res.status(201).json({message: "Succesfully added table"});
    } catch(err) {
        console.log(err);
        if (err.name === 'ValidationError') {
			for (const field in err.errors)
				return res.status(400).json({ message: err.errors[field].properties.message });
		}
		return res.status(500).json({message: 'Server Error'});
    }
})

const validateSqlInsert = (table, item) => {
    const fields = new Set();
    const fieldInfo = {};
    for(let col of table.columns) {
        if(col.isNotNull) if(!(col.columnName in item)) 
            return {success: false, message: `Required ${col.columnName} field`};
        fields.add(col.columnName);
        fieldInfo[col.columnName] = col;
    }
    for(let field of Object.keys(item))
        if(!fields.has(field)) return {success: false, message: `Unkown field ${field}`};

    for(let field of Object.keys(item)) {
        const value = item[field];
        if(fieldInfo[field].columnType === 'INT') {
            if(typeof value !== 'number') return {success: false, message: `Expected integer ${field}`};
        } else if(fieldInfo[field].columnType === 'BOOLEAN') {
            if(typeof value !== 'boolean') return {success: false, message: `Expected boolean ${field}`};
        } else if(fieldInfo[field].columnType === 'VARCHAR') {
            if(typeof value !== 'string') return {sucess: false, message: `Expected string ${field}`};
        }
    }
    return {success: true};
}

const createInsertSqlQuery = (item, collection) => {
    const keys = Object.keys(item);
    const values = keys.map(key => item[key]);
    let valueString = ``;
    for(const value of values) {
        if(valueString != '') valueString += ', ';
        if(typeof value === 'string') valueString += '"' + value + '"';
        else valueString += `${value}`;
    }
    let query = format("INSERT INTO %s(%L) VALUES(%s)", collection, keys, valueString);
    return query;
}

router.post('/insert', requireLogin(false), async (req, res) => {
    const {collection, item, id} = req.body;
    try {
        const db = await Database.findById(id);
        if(!db) return res.status(400).json({message: 'Database not found'});
        if(db.type === 'sql') {
            const table = db.tables.filter(table => table.tableName === collection);
            if(table.length === 0) return res.status(400).json({message: `Collection ${collection} does not exist`});
            const check = validateSqlInsert(table[0], item);
            if(!check.success) return res.status(400).send({message: check.message});
            const query = createInsertSqlQuery(item, collection);
            console.log(query);
            return res.status(200).send();
        } else {

        }

    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
})

const validateSqlSelect = (table, required, filter) => {
    const fields = new Set();
    const fieldInfo = {};
    for(let col of table.columns) {
        fields.add(col.columnName);
        fieldInfo[col.columnName] = col;
    }
    for(let requiredField of required) if(!fields.has(requiredField)) 
        return {success: false, message: `Unknown required field ${requiredField}`};
    for(let filterField of Object.keys(filter)) {
        const value = filter[filterField];
        if(!fields.has(filterField)) 
            return {success: false, message: `Unknown filter ${filterField}`};

        if(fieldInfo[filterField].columnType === 'VARCHAR') {
            if(typeof value !== 'string') return {success: false, message: `Expected a string for ${filterField}`};
        } else if(fieldInfo[filterField].columnType === 'BOOLEAN') {
            if(typeof value !== 'boolean') return {success: false, message: `Expected a boolean for ${filterField}`};
        } else if(fieldInfo[filterField].columnType === 'INT') {
            if(typeof value !== 'number') return {success: false, message: `Expected a number for ${filterField}`};
        }
    }
    return {success: true};
}

const createSelectSqlQuery = (collection, required, filter) => {
    let query = '';
    if(required.length === 0) query = `SELECT * FROM ${collection}`;
    else query = format("SELECT %s FROM %s", required, collection);
    const filterFields = Object.keys(filter);
    if(filterFields.length) {
        let filterQuery = '';
        for(let filterField of filterFields)  {
            if(filterQuery != '') filterQuery += ' AND ';
            filterQuery += `${filterField}=`;
            if(typeof filter[filterField] === 'string')
                filterQuery += "'" + filter[filterField] + "'";
            else filterQuery += `${filter[filterField]}`;
        }
        query += " WHERE " + filterQuery;
    }
    return query;
}

router.post('/select', requireLogin(false), async (req, res) => {
    let {collection, id, required, filter} = req.body;
    try {
        const db = await Database.findById(id);
        if(!db) return res.status(400).json({message: 'Database not found'});
        if(!required) required = [];
        if(db.type === 'sql') {
            const table = db.tables.filter(table => table.tableName === collection);
            if(table.length === 0) return res.status(400).json({message: `Collection ${collection} does not exist`});
            const check = validateSqlSelect(table[0], required, filter);
            if(!check.success) return res.status(400).json({message: check.message});
            const query = createSelectSqlQuery(collection, required, filter);
            console.log(query);
            return res.status(200).send();
        } else {

        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
})

router.get('/')

module.exports = router;