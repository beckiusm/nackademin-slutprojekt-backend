const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orders.js')

//create an order
router.post('/', orderController.createOrder)

//get orders
router.get('/', orderController.getOrders)

module.exports = router