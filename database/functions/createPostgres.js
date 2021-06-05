const { exec } = require("child_process");
const { getDb } = require("../db");
const { ObjectId } = require("bson");

// Function to spawn a new Postgres DB
const createPostgres = async (id, port) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Run Shell command to spawn docker container with ID as name and an external port
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

                // Update the "databases" collection on master database with the new metadata like address and port
                db.collection('databases').updateOne(
                    { _id: ObjectId(id) },
                    { $set: { address: `139.59.67.118`, port } },
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