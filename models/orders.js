const mongoose = require('mongoose')
require('dotenv').config()
const usersModel = require('./users')
const productsModel = require('./products.js')

const orderSchema = new mongoose.Schema({
    timeStamp: Date, 
    status: String,
    items: Array,
    orderValue: Number
}, {versionKey: false})

const Order = mongoose.model('Order', orderSchema)

//create an order for a user
async function createOrderForAnonymousUser(products) {
    try {
        let orderValue = 0
        for(productId of products.items) {
            let product = await productsModel.getProduct(productId);
            orderValue += +product.price;
        }
        const newOrder = await Order.create({
            timeStamp: Date.now(),
            status: 'inProcess',
            items: products,
            orderValue: orderValue
        });
        return newOrder._doc
    } catch (error) {
        return error
    }
}

async function createOrderForCustomer(id, products) {
    
    try {
        let orderValue = 0
        for(productId of products.items) {
            let product = await productsModel.getProduct(productId);
            orderValue += +product.price;
        }
        const newOrder = await Order.create({
            timeStamp: Date.now(),
            status: 'inProcess',
            items: products,
            orderValue: orderValue
        });
        await usersModel.updateUser(id, newOrder);
        return newOrder._doc
    } catch (error) {
        return error
    }
}

//get all orders that an user has created
async function getOrders(id) { //här behöver vi lägga till en paramater, såsom id
    try {
        const orderResponse = await usersModel.getUser(id) //här behöver vi lägga till _id: id
        return orderResponse.orderHistory;
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
    createOrderForAnonymousUser,
    createOrderForCustomer,
    getOrders,
    getOrdersAll,
    clearOrders
}