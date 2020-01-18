let  fetch = require('node-fetch')
let redis = require('redis')
const client = redis.createClient()
const{promisify} = require('util')

const setAsync = promisify(client.set).bind(client)

const baseUrl = 'https://jobs.github.com/positions.json'

let fetchGithub =async ()=>{
    try {
        let counter =1
        let pageNumber =0
        const allJobs =[]
        while(counter>0){
        let res = await fetch(`${baseUrl}?page=${pageNumber}`)
        let jobs = await res.json()
        allJobs.push(...jobs)
        counter = jobs.length
        console.log('got', counter, 'jobs')
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
        console.log('got',remoteJobs.length,'jobs total')
        const redisData = await setAsync('github', JSON.stringify( remoteJobs))
        console.log(redisData)
        
    } catch (error) {
        console.log(error.message)
    }
}
//fetchGithub()
module.exports ={fetchGithub}