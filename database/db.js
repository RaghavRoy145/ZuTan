const MongoClient = require('mongodb').MongoClient;

// MongoDB URL for fetching metadata about the databases that are to be created
const url = "mongodb+srv://admin:admin123@cluster0.n4ikz.mongodb.net";

var _db;

module.exports = {

    // Function to connect to server. Stores the connection in _db. Will be called only once per server instance initially when server starts.
    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            _db = client.db('ZuTan');
            return callback(err);
        });
    },

    // Getter Function to fetch the DB connection and execute queries. 
    getDb: function () {
        return new Promise((resolve, reject) => {
            resolve(_db);
        })
    },
};