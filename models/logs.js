const { json } = require('express');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const logsSchema = new Schema({
    url: {
        protocol: String, 
        hostname: String, 
        host: String,
        originalUrl: String, 
        baseUrl: String, 
        subdomains: Array,
        method: String,
        path: String,
        route: Object
    }, 
    headers: Array, 
    params: Object, 
    query: Object, 
    body: Object,
    clientInfo: {
        ip: String, 
        ips: Array, 
        contentType: String,
        userAgent : String, 
        referrer: String,
        time: String
    }, 
})


module.exports = mongoose.model('Logs', logsSchema)