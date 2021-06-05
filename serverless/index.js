const psql_command = require('./psql_command');
const { mongoInsert, mongoSelect } = require('./mongo_command');

exports.handler = (event, context, callback) => {
    try {
        // console.log(event);
        let body;
        if (event.body) {
            body = JSON.parse(event.body);
        }
        // console.log(`The ID is ${event.queryStringParameters?.id}`);
        // return { statusCode: 200, body: JSON.stringify({ id : event.queryStringParameters?.id }) };
        // connectToDatabase().then((c) => {
        //     let client = c.db('ZuTan');
        //     console.log("Mongo has connected")
        //     client.collection('databases').find({ _id: ObjectId(String(event.queryStringParameters.id)) }).toArray((err, data) => {
        //         if (err) {
        //             console.log(err);
        //             callback(Error(err))
        //         };
        //         console.log(`Mongo has fetched documents\n ${data}`)
        //         callback(null, {
        //             headers: {
        //                 "Access-Control-Allow-Origin": "*",
        //                 "Access-Control-Allow-Credentials": true,
        //             },
        //             statusCode: 200,
        //             body: JSON.stringify(data),
        //             isBase64Encoded: false
        //         });
        //     });
        // }).catch((err) => { throw err });
        // console.log(body, body.type == 'psql_insert', body.type == "psql_insert", body.type === "psql_insert");
        if (body.type == 'psql_insert') {
            psql_command(body.address, body.port, body.command)
                .then(() => {
                    console.log("DONE SQL INSERT!");
                    callback(null, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        statusCode: 200,
                        body: JSON.stringify({ status: "Done" }),
                        isBase64Encoded: false
                    });
                })
                .catch((err) => {
                    console.log("Error!")
                    throw err;
                })
        } else if (body.type == 'psql_select') {
            psql_command(body.address, body.port, body.command)
                .then((res) => {
                    console.log("DONE SQL SELECT!");
                    callback(null, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        statusCode: 200,
                        body: JSON.stringify({ rowCount: res.rowCount, result: res.rows }),
                        isBase64Encoded: false
                    });
                })
                .catch((err) => {
                    console.log("Error!")
                    throw err;
                })
        } else if (body.type == 'mongo_insert') {
            mongoInsert(body.address, body.data)
                .then(() => {
                    console.log("DONE MONGO INSERT!");
                    callback(null, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        statusCode: 200,
                        body: JSON.stringify({ status: "Done" }),
                        isBase64Encoded: false
                    });
                })
                .catch((err) => {
                    console.log("Error!")
                    throw err;
                })
        }
        else if (body.type == 'mongo_select') {
            mongoSelect(body.address, body.data)
                .then(() => {
                    console.log("DONE MONGO INSERT!");
                    callback(null, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        statusCode: 200,
                        body: JSON.stringify({ status: "Done" }),
                        isBase64Encoded: false
                    });
                })
                .catch((err) => {
                    console.log("Error!")
                    throw err;
                })
        }
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

// const test = () => {
//     psql_command("34.197.98.169", 9000, "SELECT age,username FROM Users WHERE age = 20;")
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log("Error!")
//             throw err;
//         })
// }

// test()