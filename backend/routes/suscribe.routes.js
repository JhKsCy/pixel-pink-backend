const express = require('express') 
const router = express.Router()
const { suscribeUser, findAllSuscribedUsers, deleteSuscribedUser } = require('./../controllers/suscribe.controller')


router.post('/suscribe', suscribeUser)
router.get('/find-suscribers', findAllSuscribedUsers)
router.post('/delete-suscribtion', deleteSuscribedUser)

module.exports = router