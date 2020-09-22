const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const auth = require('../middleware/auth.js');

// get list
router.get('/:id', productController.getProduct);

// get lists
router.get('/', productController.getProducts);

// create list
router.post('/', auth.user, productController.createProduct);

// update list
router.patch('/:id', productController.updateProduct);

// delete list
router.delete('/:id', productController.deleteProduct);

module.exports = router;
