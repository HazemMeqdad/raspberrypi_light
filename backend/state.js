const { readFile, writeFile } = require("fs");
const path = require("path");

const path_file = path.join(__dirname, "../state.txt");

function read_state() {
    return new Promise((resolve, reject) => {
        readFile(path_file, "utf-8", (err, contents) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(contents);
        })
    })
}

function write_state(contents) {
    return new Promise((resolve, reject) => {
        writeFile(path_file, contents, "utf-8", (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        })
    })
}


module.exports.read_state = read_state;
module.exports.write_state = write_state;
