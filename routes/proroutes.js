const express = require('express')
const router = express.Router()
const procontroller = require ('../controllers/procontroller')

router.post('/addproduct',procontroller.add,procontroller.authenticateToken)

module.exports = router 