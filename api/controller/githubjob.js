//const redis = require('redis')
//const client = redis.createClient()
//const{promisify} = require('util')
const Dbconnector = require('../config/connector')
const con = new Dbconnector()

//const getAsync = promisify(client.get).bind(client)

const getGithubJobs= async (req, res) => {
    try {
        const sql = "SELECT * FROM dev.all_remotejobs";
        const result = await con.fetchAll(sql);
        res.send(result.rows)
      } catch (error) {
        res.status(404);
        res.send({});
      }
}

module.exports={getGithubJobs}