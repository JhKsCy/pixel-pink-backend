const express = require('express') 
const router = express.Router()
const { addProductToCart, removeProductFromCart } = require('./../controllers/order.controller')
const { validateToken } = require('./../middlewares/validateToken')


router.post('/add-product', validateToken, addProductToCart)
router.post('/delete-product', validateToken, removeProductFromCart)

module.exports = router