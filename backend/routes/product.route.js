const express = require('express') 
const router = express.Router()
const { newProduct, updateProduct, getProductById } = require('./../controllers/product.controller')
const { upload } = require('./../middlewares/upload')
const { validateToken } = require('./../middlewares/validateToken')

router.post('/new-product', validateToken, newProduct)
router.put('/update-product/:id', validateToken, updateProduct)
router.get('/get-product/:id',  getProductById)

module.exports = router