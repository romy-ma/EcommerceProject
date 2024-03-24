const express = require('express')
const router = express.Router()
const procontroller = require ('../controllers/procontroller')

router.post('/addproduct',procontroller.authenticateToken,procontroller.add)
router.put('/editproduct',procontroller.authenticateToken,procontroller.edit)
router.delete('/deleteproduct',procontroller.authenticateToken,procontroller.delete)

module.exports = router 