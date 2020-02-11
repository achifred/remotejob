require("dotenv").config();
const { app } = require("./app");
let CronJob = require("cron").CronJob;

const { fetchGithub } = require("../worker/source/github");
const port = process.env.PORT || 3000;

app.listen(
    port,
    () =>
        new CronJob("* * * * *", fetchGithub, null, true, "America/Los_Angeles")
);
