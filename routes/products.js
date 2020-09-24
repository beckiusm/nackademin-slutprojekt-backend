const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const auth = require('../middleware/auth.js')

// get product
router.get('/:id', productController.getProduct)

// get products
router.get('/', productController.getProducts)

// create product
router.post('/', auth.user, productController.createProduct)

// update product
router.patch('/:id', auth.user, productController.updateProduct)

// delete product
router.delete('/:id', auth.user, productController.deleteProduct)

module.exports = router
