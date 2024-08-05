const express = require('express')
const router = express.Router()
const user = require('./user.routes')
const userdata = require('./userdata.routes')
const suscribe = require('./suscribe.routes')
const product = require('./product.route')
// const size = require('./size.routes')
// const order = require('./order.route')

router.use('/api', user)
router.use('/api', userdata)
router.use('/api', suscribe)
router.use('/api', product)
// router.use('/api', size)
// router.use('/api', order)


module.exports = router