const redis = require('redis')
const client = redis.createClient()
const{promisify} = require('util')

const getAsync = promisify(client.get).bind(client)

const getGithubJobs= async (req, res) => {
    const jobs = await getAsync('github')
    res.send(jobs)
}

module.exports={getGithubJobs}