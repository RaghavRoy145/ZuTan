const { exec } = require("child_process");
const { getDb } = require("../db");
const { Client } = require('pg')

const createPostgresTable = async (databaseId, tableDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDb();
            db.collection('database').find({ _id: databaseId }).toArray((err, data) => {
                console.log(data);
            });
            const client = new Client({
                host: 'localhost',
                database: 'postgres',
                password: 'mysecretpassword',
                port: 5432,
            })
            client.connect()
            client.query('SELECT NOW()', (err, res) => {
                console.log(err, res)
                client.end()
            })
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    })
}

module.exports = createPostgresTable;