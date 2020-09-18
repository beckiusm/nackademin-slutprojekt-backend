const mongoose = require('mongoose')
require('dotenv').config()

const orderSchema = new mongoose.Schema({
    timeStamp: Date, 
    status: String,
    items: Array,
    orderValue: Number
})

const Order = mongoose.model('Order', orderSchema)

//create an order
async function createOrder(items) {
    console.log(items)
    try {
        let orderValue = 0
        items.map(item => orderValue += +item.price)
        
        const newOrder = await Order.create({
            timeStamp: Date.now(),
            status: 'inProcess',
            items: items,
            orderValue: orderValue
        })
        return newOrder._doc
    } catch (error) {
        res.status(500).json(error)
    }
}

//get all orders that an user has created
async function getOrders() { //här behöver vi lägga till en paramater, såsom id
    try {
        const orderResponse = await Order.find({}) //här behöver vi lägga till _id: id
        return orderResponse
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createOrder,
    getOrders
}