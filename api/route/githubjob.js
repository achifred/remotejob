const express = require('express')

const router = express.Router()

const{getGithubJobs} = require('../controller/githubjob')

router.get('/', getGithubJobs)

module.exports =router