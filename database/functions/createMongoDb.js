const { exec } = require("child_process");
const { getDb } = require("../db");

const createMongoDb = async (id, port) => {
    return new Promise(async (resolve, reject) => {
        try {
            exec(`docker container run -p ${port}:27017 --name ${id} -d mongo`, async (error, stdout, stderr) => {
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
                    { _id: id },
                    { $set: { address: `mongodb://34.197.98.169:${port}`, } },
                    function (err, _) {
                        if (err) return reject(err);
                    }
                )
                console.log(`stdout: ${stdout}`);
                return resolve(stdout);
            });
        } catch (err) {
           console.log(err) ;
           return reject(err);
        }
    })
}

module.exports = createMongoDb;