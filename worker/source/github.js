let  fetch = require('node-fetch')
const DbConnector = require('../../api/config/connector')

let redis = require('redis')
const client = redis.createClient()
const{promisify} = require('util')

const setAsync = promisify(client.set).bind(client)
const con = new DbConnector()
const baseUrl = 'https://jobs.github.com/positions.json'

let fetchGithub =async ()=>{
    try {
        let counter =1
        let pageNumber =0
        const allJobs =[]
        const sql = "SELECT * FROM dev.add_remotejobs($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)"
        while(counter>0){
        let res = await fetch(`${baseUrl}?page=${pageNumber}`)
        let jobs = await res.json()
        allJobs.push(...jobs)
        counter = jobs.length
       // console.log('got', counter, 'jobs')
        pageNumber++
        }

        const remoteJobs = allJobs.filter(job=>{
            const jobLocation = job.location.toLowerCase()
            if (jobLocation.includes('remote')) {
                
                return true
            } else {
                return false
            }
        })
        //console.log(remoteJobs)
        remoteJobs.forEach(async item => {
            const result =  await con.Query(sql, 
                [
                    item.id, 
                    item.type, 
                    item.url, 
                    item.company,
                    item.company_url,
                    item.location,
                    item.title,
                    item.description,
                    item.created_at,
                    item.company_logo
                ])
                //console.log(result)
            
        });
        //const redisData = await setAsync('github', JSON.stringify( remoteJobs))
        //console.log(redisData)
        
    } catch (error) {
        console.log(error.message)
    }
}
//fetchGithub()
module.exports ={fetchGithub}