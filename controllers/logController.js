const Logs = require('../models/logs');

exports.getLogs = async (req, res) => {
    let logs = await Logs.find()
    res.json(logs)
}