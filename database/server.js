const express = require('express');
const cors = require('cors');
const createMongoDb = require('./functions/createMongoDb');

// Set up Express Server
const app = express();
app.use(express.json());

//Setup CORS Middleware
app.use(cors());

app.post('/createMongoDatabase', (req, res) => {
    try {
        const { id } = req.body;
        await createMongoDb(id);
        return res.status(200).send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Error");
    }
});



// app.listen(5000, () => console.log("Running on port 5000"));