const express = require('express')
const router =  express.Router()
const ordercontroller = require('../controllers/ordercontroller')


router.post('/to-order',ordercontroller.order)

module.exports = router 
