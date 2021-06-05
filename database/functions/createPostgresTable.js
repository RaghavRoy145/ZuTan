const { exec } = require("child_process");
const { getDb } = require("../db");
const { Client } = require('pg');
const { ObjectId } = require("bson");

const createPostgresTable = async (databaseId, tableDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDb();
            db.collection('databases').find({ _id: ObjectId(databaseId) }).toArray((err, data) => {
                if(err) throw err;
                console.log(data);
                const port = data[0].port;
                const client = new Client({
                    user : "postgres",
                    host: 'localhost',
                    database: 'postgres',
                    password: 'mysecretpassword',
                    port,
                })
                client.connect();
                const { tableName, columns } = tableDetails;
                const numberOfColumns = columns.length;
                let createString = `CREATE TABLE ${tableName} (`;
                columns.forEach((column, i) => {
                    const { columnName, columnType, isPrimaryKey, isNotNull } = column;
                    createString += `${columnName} ${columnType} ${isPrimaryKey ? 'PRIMARY KEY' : ''} ${isNotNull ? 'NOT NULL' : ''} ${i === numberOfColumns - 1 ? '' : ','}`
                });
                createString += ');';
                console.log(createString);
                client.query(createString, (err, res) => {
                    console.log(err, res);
                    if (err) reject(err);
                    client.end();
                    resolve();
                })
            });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}

module.exports = createPostgresTable;