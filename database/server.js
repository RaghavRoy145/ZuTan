const express = require('express');
const cors = require('cors');
const db = require('./db');
const createMongoDb = require('./functions/createMongoDb');

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

let externalPort = 9000;

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


app.listen(5000, () => console.log("Running on port 5000"));