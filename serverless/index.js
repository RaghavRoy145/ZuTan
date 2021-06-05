const psql_command = require('./psql_command');
const { mongoInsert, mongoSelect } = require('./mongo_command');

exports.handler = (event, context, callback) => {
    try {
        // console.log(event);
        let body;
        if (event.body) {
            body = JSON.parse(event.body);
        }

        // IF conditions to run database query based on type of query

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
                .then((res) => {
                    console.log("DONE MONGO INSERT!");
                    callback(null, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": true,
                        },
                        statusCode: 200,
                        body: JSON.stringify({ res }),
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