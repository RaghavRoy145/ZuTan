const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin123@cluster0.n4ikz.mongodb.net";
const { ObjectId } = require("bson");

const { connectToDatabase } = require('./db')

exports.handler = (event, context, callback) => {

    // TODO implement
    try {
        if (!event.queryStringParameters?.id) return {
            statusCode: 403,
            body: `You need to pass a name parameter in the GET query v7`,
        }
        console.log(`The ID is ${event.queryStringParameters?.id}`);
        // return { statusCode: 200, body: JSON.stringify({ id : event.queryStringParameters?.id }) };
        connectToDatabase().then((c) => {
            let client = c.db('ZuTan');
            console.log("Mongo has connected")
            client.collection('databases').find({ _id: ObjectId(String(event.queryStringParameters.id)) }).toArray((err, data) => {
                if (err) {
                    console.log(err);
                    callback(Error(err))
                };
                console.log(`Mongo has fetched documents\n ${data}`)
                callback(null, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true,
                    },
                    statusCode: 200,
                    body: JSON.stringify(data),
                    isBase64Encoded: false
                });
            });
        }).catch((err) => { throw err });
    } catch (err) {
        console.log(err);
        // return {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Methods': '*',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     statusCode: 500,
        //     body: JSON.stringify(err)
        // };
        callback(Error(err))
    }
};

const test = async () => {
    const client = await connectToDatabase();
    const db = client.db('ZuTan');
    console.log("Mongo has connected")
    const res = await db.command({
        find : 'databases',
        projection : {port : 1}
    });
    console.log(res.cursor.firstBatch)
    client.close();
}

test();