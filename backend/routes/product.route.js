const express = require('express') 
const router = express.Router()
const { newProduct, updateProduct, getProductById } = require('./../controllers/product.controller')
const { upload } = require('./../middlewares/upload')
const { validateToken } = require('./../middlewares/validateToken')

router.post('/new-product', validateToken, upload.fields([{ name: 'imgA', maxCount: 1 }, { name: 'imgB', maxCount: 1 }, { name: 'imgC', maxCount: 1 }]), newProduct)
router.put('/update-product/:id', validateToken, upload.fields([{ name: 'imgA', maxCount: 1 }, { name: 'imgB', maxCount: 1 }, { name: 'imgC', maxCount: 1 }]),  updateProduct)
router.get('/get-product/:id',  getProductById)

module.exports = router