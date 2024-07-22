const express = require('express') 
const router = express.Router()
const { newProduct, updateProduct } = require('./../controllers/product.controller')
const { validateToken } = require('./../middlewares/validateToken')

router.post('/new-producte', validateToken, newProduct)
router.put('/update-product/:id', validateToken,  updateProduct)

module.exports = router