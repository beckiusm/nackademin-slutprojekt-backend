const chai = require("chai")
chai.should()
const { expect } = chai

const ordersModel = require("../../models/orders")
const usersModel = require('../../models/users')
const database = require('../../database/db')
const permissions = require('../../middleware/permissions')
const auth = require("../../middleware/auth")
const helper = require('../helper')

describe("Unit test: ordersmodel", () => {
    before( async () => {
        await database.connect();
    })

    after( async () => {
        await database.disconnect()
    })
    
    beforeEach(async function() {
      await ordersModel.clearOrders()
      await usersModel.clearDatabase()
      
      const user = await helper.generateTestCustomer(orders)
      const token = await helper.generateToken()
      const orders = await helper.generateTestOrders(user._id)

      this.currentTest.user = user
      this.currentTest.orders = orders
    })
    
    it("Should create an order", async function() {
        const items = [
            {
                title: 'Gretas Fury',
                price: 999,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            },
            {
                title : "Swag",
                price : 799,
                shortDesc : "Unisex",
                category : "board",
                longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                imgFile : "skateboard-generic.png"
            },
            {
                title : "Hoodie",
                price : 699,
                shortDesc : "Ash unisex",
                category : "clothes",
                longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                imgFile : "hoodie-ash.png"
            }
        ]
        const orderValue = 2497
        const resOrder = await ordersModel.createOrder(this.test.user._id, items)
        expect(
            resOrder.status, 
            resOrder.items, 
            resOrder.orderValue 
        )
        .to.be.equal(
            "inProcess", 
            items,
            orderValue
        )
    })

    it("Should get all orders", async function() {
        const items = await helper.generateTestItems()
        const orderValue = 1798

        const resAllOrders = await ordersModel.getOrders(this.test.user._id)
        expect(
            resAllOrders[0].orderHistory[0].items[0].title,
            resAllOrders[0].orderHistory[0].items[0].price,
            resAllOrders[0].orderHistory[0].items[0].shortDesc,
            resAllOrders[0].orderHistory[0].items[0].longDesc,
            resAllOrders[0].orderHistory[0].items[0].imgFile,
            resAllOrders[0].orderHistory[0].orderValue
        )
        .to.be.equal(
            items[0].title,
            items[0].price,
            items[0].shortDesc,
            items[0].longDesc,
            items[0].imgFile,
            orderValue
        )
    })
})