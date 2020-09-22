const permissions = require('../middleware/permissions');
const ordersModel = require('../models/orders.js')
const auth = require('../middleware/auth.js');

//create an order
async function createOrder(req, res) {
    try {
        if (!req.user) {
            const order = await ordersModel.createOrderForAnonymousUser(req.body);
            res.status(201).json(order);
        } else {
            const order = await ordersModel.createOrderForCustomer(req.user._id, req.body);
            res.status(201).json(order);
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//get all orders
async function getOrders(req, res) {
    try {
        if (permissions.canReadAllOrders(req.user)) {
            const orders = await ordersModel.getOrdersAll();
            res.status(200).json(orders)
        } else {
            const orders = await ordersModel.getOrders(req.user._id);
            res.status(200).json(orders)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//clear all orders when testing
async function clearOrders(req, res) {
    try {
        const clear = await ordersModel.clearOrders();
        res.status(200).json(clear)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createOrder, getOrders, clearOrders
}