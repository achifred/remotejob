const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const githubjobroutes = require('./route/githubjob')
const devjobroutes = require('./route/devjob')
const userroutes = require('./route/users')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, PATCH");
      return res.status(200).json({});
    }
    next();
  });

  app.use('/jobs',githubjobroutes)
  app.use('/devjob',devjobroutes)
  app.use('/users', userroutes)


  module.exports={app}