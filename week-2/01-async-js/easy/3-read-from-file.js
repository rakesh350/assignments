const fs = require('fs');

const readTxtFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err){ reject(err) }
            resolve(data);
        })
    });
}

const readFileEx = async () => {
    try {
        let fileContent = await readTxtFile();
        console.log(fileContent);
    } catch (error) {
        console.log(error)
    }
}

module.exports = readTxtFile;

// readFileEx();

// expensive operation
// let j = 0;
// for(let i = 0; i < 10000000000; i++) {
//     j = i;
// }
// console.log(j)

