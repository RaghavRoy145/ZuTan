const { exec } = require("child_process");
const { getDb } = require("../db");

const createPostgres = async (id, port) => {
    return new Promise(async (resolve, reject) => {
        try {
            exec(`docker run --name ${id} -p ${port}:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres`, async (error, stdout, stderr) => {
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
                    { $set: { address: `34.197.98.169`, port } },
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

module.exports = createPostgres;