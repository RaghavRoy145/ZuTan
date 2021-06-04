const { exec } = require("child_process");
const { getDb } = require("../db");

const createMongoDb = (id, port) => {
    return new Promise((resolve, reject) => {
        exec(`docker container run -p ${port}:27017 --name ${id} -d mongo`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error.message)
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                reject(error.message)
                return;
            }
            const db = await getDb();

            db.collection('databases').updateOne(
                { id: _id },
                { $set: { address: `mongodb://34.197.98.169:${port}`, } },
                function (err, _) {
                    if (err) return reject(err);
                }
            )
            console.log(`stdout: ${stdout}`);
            return resolve(stdout);
        });
    })
}

module.exports = createMongoDb;