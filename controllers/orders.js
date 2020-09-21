const ordersModel = require('../models/orders.js')
const permissions = require('../middleware/permissions');
const auth = require('../middleware/auth.js');

//create an order
async function createOrder(req, res) {
    try {
        const order = await ordersModel.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        // console.log("ERROR: ", error);
        res.status(500).json(error)
    }
}

//get all orders
async function getOrders(req, res) {
    try {
        const orders = await ordersModel.getOrders();
        const authOrders = permissions.mapAuthorizedOrders(req.user, orders)
        res.status(200).json(authOrders)
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