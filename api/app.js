const express = require('express')

const app = express()

const githubjobroutes = require('./route/githubjob')

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

  module.exports={app}