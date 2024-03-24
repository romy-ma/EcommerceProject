const express = require('express')
const router = express.Router()
const cartcontroller = require ('../controllers/cartcontroller')


router.post('addcart',cartcontroller.authenticateToken,cartcontroller.addcart)
router.put('majcart',cartcontroller.authenticateToken,cartcontroller.maj)
router.delete('addcart',cartcontroller.authenticateToken,cartcontroller.delete)
router.get('addcart',cartcontroller.authenticateToken,cartcontroller.display)

module.exports = router 

