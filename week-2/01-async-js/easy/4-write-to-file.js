const fs = require('fs');

const writeToFile = async (whatToWrite = 'Hola...') => {
    let writenFile = await fs.writeFile('my-text.txt', whatToWrite, 'utf-8', (err) => {
        if(err) console.log(`Something went wrong : ${err}`);
    });
}

writeToFile('Hello world');