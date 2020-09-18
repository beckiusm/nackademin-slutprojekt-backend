const ordersModel = require('../models/orders.js')

//create an order
async function createOrder(req, res) {
    try {
        const order = await ordersModel.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json(error)
    }
}

//get all orders
async function getOrders(req, res) {
    try {
        const orders = await ordersModel.getOrders();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createOrder, getOrders
}