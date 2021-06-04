const { exec } = require("child_process");

const createMongoDb = (id) => {
    return new Promise((resolve, reject) => {
        exec(`docker container run -d mongo`, (error, stdout, stderr) => {
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
            console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    })
}

module.exports = createMongoDb;