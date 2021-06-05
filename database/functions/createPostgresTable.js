const { getDb } = require("../db");
const { Client } = require('pg');
const { ObjectId } = require("bson");

// Function that creates tables inside a Database. Takes the database ID and table details as input.
const createPostgresTable = async (databaseId, tableDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDb();

            // Connect to the metadata database to fetch information about the spawned database
            db.collection('databases').find({ _id: ObjectId(databaseId) }).toArray((err, data) => {
                if(err) throw err;
                console.log(data);
                const port = data[0].port;

                //Connect to the spawned PSQL Database
                const client = new Client({
                    user : "postgres",
                    host: 'localhost',
                    database: 'postgres',
                    password: 'mysecretpassword',
                    port,
                })
                client.connect();

                // Create a SQL Query to create table 
                const { tableName, columns } = tableDetails;
                const numberOfColumns = columns.length;
                let createString = `CREATE TABLE ${tableName} (`;
                columns.forEach((column, i) => {
                    const { columnName, columnType, isPrimaryKey, isNotNull } = column;
                    createString += `${columnName} ${columnType} ${isPrimaryKey ? 'PRIMARY KEY' : ''} ${isNotNull ? 'NOT NULL' : ''} ${i === numberOfColumns - 1 ? '' : ','}`
                });
                createString += ');';
                console.log(createString);

                //Execute CREATE query
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