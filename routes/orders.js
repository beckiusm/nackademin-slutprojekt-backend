const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orders.js')
const auth = require('../middleware/auth')
//create an order
router.post('/', auth.anonymous, orderController.createOrder)

//get orders
router.get('/', auth.user, orderController.getOrders)

module.exports = router