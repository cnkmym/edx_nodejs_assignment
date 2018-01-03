const async = require('async');
const customers = require('./m3-customer-data.json');
const customerAddress = require('./m3-customer-address-data.json');
const MongoClient = require('mongodb').MongoClient;

// Get Command Line Parameters
const limit = (process.argv[2]) ? (parseInt(process.argv[2]) || 100) : 1000;

// Define Database
const url = "mongodb://localhost:27017";
const dbName = "edx_mongo_basics";

const start = (db, callback) => {
  // calculate lower/upper bound of each loop unit
  const groups = (total, size) => {
    let data = [];
    let index = 0;
    while (index < total) {
      let current = index + size - 1;
      current = (current >= total) ? total - 1 : current;
      data.push({
        "start": index,
        "end": current
      });
      index = current + 1;
    }
    return data;
  };
  // define processing logic
  const joinData = (group, done) => {
    console.log(group);
    const startTime = Date.now();
    const data = customers.slice(group.start, group.end + 1).map((item, index) => {
      return Object.assign({}, item, customerAddress[index + group.start]);
    });
    db.collection("customers").insert(data, (error, results) => {
      let endTime = Date.now();
      console.log("Finish inserting records group (No." + group.start + " to No." + group.end + ") within " + (endTime - startTime) + " ms");
      done(error,results);
    });
  };
  // execute the task in parallel
  //console.log(groups(customers.length, limit));
  async.each(groups(customers.length, limit), (item, callback_it) => {
    joinData(item, callback_it);
  }, (error, results) => {
    console.log("In final call back method");
    callback(error);
  });
};
// Setup Database Connection
MongoClient.connect(url, (error, client) => {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  let db = client.db(dbName);
  if (db === undefined) {
    console.error(error.message);
    process.exit(1);
  }
  start(db, () => {
    client.close();
  });
});
