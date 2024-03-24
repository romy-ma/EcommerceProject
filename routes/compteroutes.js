const { authentification } = require('../controllers/authcontroller')
const compteRoutes = require('../controllers/comptecontroller')
const express = require('express')
const router = express.Router()




//getinfo
router.get('/getinfo', compteRoutes.authenticateToken, compteRoutes.getInfo)
//majinfo
router.put('/majinfo', compteRoutes.authenticateToken, compteRoutes.majInfo)
//changepwd
router.put('/change-mdp', compteRoutes.authenticateToken, compteRoutes.changePwd)
//lhistorique
router.get('/historique', compteRoutes.authenticateToken, compteRoutes.history)
//stauts
router.get('/status', compteRoutes.authenticateToken, compteRoutes.status)


module.exports = router;
