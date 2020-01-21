const express = require('express')

const router = express.Router()

const{addJob,fetchJob} = require('../controller/devjob')

router.post('/', addJob)
router.get('/', fetchJob)

module.exports = router