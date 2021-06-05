const { MongoClient } = require('mongodb');



const mongoInsert = (address, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `${address}/Zutan`;
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            let db = client.db('ZuTan');
            await db.runCommand(data);
            client.close(() => console.log("DB Closed"));
            resolve();
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

const mongoSelect = (address, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `${address}/Zutan`;
            const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            let db = client.db('ZuTan');
            const res = await db.runCommand(data);
            console.log(res);
            client.close(() => console.log("DB Closed"));
            resolve();
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

module.exports = { mongoInsert, mongoSelect }