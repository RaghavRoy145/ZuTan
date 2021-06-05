"use strict";
// Import dependency.
const { MongoClient } = require('mongodb');
// Connection string to the database
const uri = "mongodb+srv://admin:admin123@cluster0.n4ikz.mongodb.net/Zutan";

// Validate that the database connection string has been configured.
if (!uri) {
    throw new Error(
        'The MONGODB_URI environment variable must be configured with the connection string ' +
        'to the database.'
    );
}
// Cached connection promise
let cachedPromise = null;
// Function for connecting to MongoDB, returning a new or cached database connection
module.exports.connectToDatabase = async function connectToDatabase() {
    if (!cachedPromise) {
        cachedPromise =
            MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    // await on the promise. This resolves only once.
    const client = await cachedPromise;
    return client;
}