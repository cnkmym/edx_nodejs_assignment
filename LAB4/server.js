const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorhandler = require('errorhandler');
const accountRouter = require('./routes').Account;

const app = new express();
app.use(bodyParser.json());
app.use(errorhandler());
app.use(logger('dev'));

app.get('/accounts',accountRouter.listAll);
app.post('/accounts',accountRouter.create);
app.put('/accounts/:id',accountRouter.update);
app.delete('/accounts/:id',accountRouter.delete);


const url = "mongodb://localhost:27017/edx_mongoose";
mongoose.connect(url,(error)=>{
  if (error){
    console.error(error.message);
    process.exit(1);
  }
  console.log("Ready to start Server on locahost:3000 as DB connection is ready !");
  app.listen(3000);
});
