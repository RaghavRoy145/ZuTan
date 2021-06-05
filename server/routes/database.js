const express = require('express');
const { requireLogin } = require('../middleware/auth');
const User = require('../models/User');
const Database = require('../models/Database');
const axios = require('axios');

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


module.exports = router;