const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:admin123@cluster0.n4ikz.mongodb.net";
const { ObjectId } = require("bson");

const { connectToDatabase } = require('./db')

exports.handler = async (event) => {

    // TODO implement
    try {
        if (!event.queryStringParameters?.id) return {
            statusCode: 403,
            body: JSON.stringify(`You need to pass a name parameter in the GET query v4`),
        }
        console.log(`The ID is ${event.queryStringParameters?.id}`);
        // return { statusCode: 200, body: JSON.stringify({ id : event.queryStringParameters?.id }) };
        const client = await connectToDatabase();
        console.log("Mongo has connected")
        client.db().collection('databases').find({ _id: ObjectId(event.queryStringParameters.id) }).toArray((err, data) => {
            console.log(err);
            if (err) throw err;
            console.log(`Mongo has fetched documents\n ${data}`)
            return { statusCode: 200, body: JSON.stringify(data) };
        });
    } catch (err) {
        console.log(err);
        return { statusCode: 403 };
    }
};

const test = async () => {
    const client = await connectToDatabase();
    console.log(client)
    const arr = client.listCollections()
    console.log(arr);
    client.db().collection('databases').find({ _id: ObjectId("60bb10534681aa9d8508818c") }).toArray((err, data) => {
        console.log(err, data);
        if (err) throw err;
        console.log(`Mongo has fetched documents\n ${data}`)
        return { statusCode: 200, body: JSON.stringify(data) };
    });
}

test();