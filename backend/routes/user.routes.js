const express = require('express') 
const router = express.Router()
const { createUser, loginUser, updateUser } = require('./../controllers/user.controller')
const users = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')


router.post('/register', users, validateFields, createUser)
router.post('/login', loginUser)
router.put('/update-user', updateUser)

module.exports = router