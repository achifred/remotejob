const DbConnector = require('../config/connector')

const con = new DbConnector()

const addJob = async(req, res)=>{
    try {
        const{title, company,company_url,location,type, description, salary} = req.body
       // console.log(req.body)
        const sql = "SELECT * FROM dev.add_job($1,$2,$3,$4,$5,$6,$7)"
        const result = await con.Query(sql,[title,company,company_url,location,type,description,salary])
        res.send(result.rows ).status(200)
    } catch (error) {
        console.log(error.message)
    }
}

const fetchJob = async(req,res)=>{
    try {
        const sql = "SELECT * FROM dev.all_jobs"
        const result = await con.fetchAll(sql)
        res.send(result.rows)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={addJob, fetchJob}