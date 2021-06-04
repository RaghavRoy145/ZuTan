const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin123@cluster0.n4ikz.mongodb.net";

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            _db = client.db('ZuTan');
            return callback(err);
        });
    },

    getDb: function () {
        return new Promise((resolve, reject) => {
            resolve(_db);
        })
    },
};