const express = require('express');
const cors = require('cors');
const db = require('./db');
const createMongoDb = require('./functions/createMongoDb');
const createPostgres = require('./functions/createPostgres');
const createPostgresTable = require('./functions/createPostgresTable');

// Set up Express Server
const app = express();
app.use(express.json());

//Setup CORS Middleware
app.use(cors());

//Start Mongo
db.connectToServer(function (err, _) {
    if (err) return console.log(err);
    console.log("Connected to DB")
});

// This port number will be incremented each time a database is spawned and used as the Port number for that new DB Instance
let externalPort = 9000;

// REST API Route to create a new mongo DB. Takes the DB ID as input and calls the createMongoDb Function
app.post('/createMongoDatabase', async (req, res) => {
    try {
        const { id } = req.body;
        await createMongoDb(id, externalPort);
        externalPort += 1;
        return res.status(200).send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Error");
    }
});

// REST API Route to create a new Postgres DB. Takes the DB ID as input and calls the createPostgres Function
app.post('/createPostgresDatabase', async (req, res) => {
    try {
        const { id } = req.body;
        await createPostgres(id, externalPort);
        externalPort += 1;
        return res.status(200).send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Error");
    }
});

app.post('/createTable', async (req, res) => {
    try {
        const { databaseId, tableDetails } = req.body;
        await createPostgresTable(databaseId, tableDetails);
        return res.status(200).send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Error");
    }
});

// Run the server and listen to new requests on port 5000
app.listen(5000, () => console.log("Running on port 5000"));