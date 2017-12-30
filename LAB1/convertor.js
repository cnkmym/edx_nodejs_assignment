const csvDefaultFilePath = 'customer-data.csv';
const targetJsonFilePath = 'customer-data.json';
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

let csvFilePath = process.argv[2] ? process.argv[2] : csvDefaultFilePath;
let targetFileName = path.join(__dirname, targetJsonFilePath);

saveToFile = (json) => {
  if (json == undefined || json == '') {
    console.error("Not Valid Json Object");
    return;
  } else {
    console.log(json);
  }
  fs.appendFile(targetFileName, json, {
    encoding: "UTF-8"
  }, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

createOutputFile = () => {
  fs.writeFileSync(targetFileName, '', {
    flag: 'w'
  }, (error) => {
    if (error) {
      console.error(error.message);
    }
  });
};

let objectArray = [];
csv() //
  .fromFile(csvFilePath) //
  .on('json', (jsonObj, rowIndex) => {
    objectArray.push(jsonObj);
  }) //
  .on('done', (error) => {
    createOutputFile();
    saveToFile(JSON.stringify(objectArray, null, 2));
    console.log('File Conversion Process is done');
  });
