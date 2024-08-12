const express = require('express') 
const router = express.Router()
const { createUserData, updateUserData, deleteUserData } = require('./../controllers/user.data.controller')
const { validateToken } = require('./../middlewares/validateToken')

router.post('/create-data', validateToken, createUserData)
router.put('/update-data/:id', validateToken, updateUserData)
router.delete('/delete-data/:id', validateToken, deleteUserData)

module.exports = router