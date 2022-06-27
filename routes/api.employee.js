const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeeController')

router.get('/', employeeController.index)
router.post('/', employeeController.create)
router.put('/', employeeController.update)
router.delete('/', employeeController.del)
router.get('/get', employeeController.getQuery)

module.exports = router;