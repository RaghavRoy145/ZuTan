const { Client } = require('pg');

const psql_command = (host, port, command) => {
    console.log(host,port,command);
    return new Promise((resolve, reject) => {
        try {
            const client = new Client({
                user: "postgres",
                host,
                database: 'postgres',
                password: 'mysecretpassword',
                port,
            })
            client.connect();
            console.log("PSQL Connected");
            client.query(command, (err, res) => {
                if (err) throw err;
                client.end();
                resolve(res);
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

module.exports = psql_command;