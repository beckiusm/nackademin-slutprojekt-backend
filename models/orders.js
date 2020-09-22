const mongoose = require('mongoose')
require('dotenv').config()
const usersModel = require('./users')

const orderSchema = new mongoose.Schema({
    timeStamp: Date, 
    status: String,
    items: Array,
    orderValue: Number
}, {versionKey: false})

const Order = mongoose.model('Order', orderSchema)

//create an order
async function createOrder(id, items) {
    // console.log(items)
    try {
        let orderValue = 0
        items.map(item => orderValue += +item.price)
        
        const newOrder = await Order.create({
            timeStamp: Date.now(),
            status: 'inProcess',
            items: items,
            orderValue: orderValue
        })
        usersModel.updateUser(id, newOrder);
        return newOrder._doc
    } catch (error) {
        return error
    }
}

//get all orders that an user has created
async function getOrders(id) { //här behöver vi lägga till en paramater, såsom id
    try {
        const orderResponse = await usersModel.getUserHistory(id) //här behöver vi lägga till _id: id
        return orderResponse
    } catch (error) {
        return error
    }
}

async function getOrdersAll() {
    try {
        const orderResponse = await Order.find({})
        return orderResponse
    } catch (error) {
        return error
    }
}

//clear all orders when testing
async function clearOrders() {
    try {
        const clear = await Order.deleteMany({});
        return clear
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrdersAll,
    clearOrders
}