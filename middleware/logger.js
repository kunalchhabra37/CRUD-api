const moment = require('moment')
const Logs = require('../models/logs')

const logger = async (req, res, next) => {
    let log = {
        url: {
            protocol: req.protocol,
            hostname: req.hostname,
            host: req.get('host'),
            originalUrl: req.originalUrl,
            baseUrl: req.baseUrl, 
            subdomains: req.subdomains,
            method: req.method, 
            path: req.path, 
            route: req.path
        },
        headers: req.rawHeaders, 
        params: req.params, 
        query: req.query, 
        body: req.body,
        clientInfo: {
            ip: req.ip,
            ips: req.ips, 
            contentType: req.get('Content-Type'), 
            userAgent: req.get('User-Agent'),
            referrer: req.get('referrer'),
            time: moment().format()
        }
    }
    await Logs.insertMany([log], (err,logg) => {
        if(err){
            console.log(err)
        }
    })
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)
    next();
}

module.exports = logger;