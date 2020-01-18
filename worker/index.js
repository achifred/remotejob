let CronJob = require('cron').CronJob;

const {fetchGithub} = require('./source/github')

new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');