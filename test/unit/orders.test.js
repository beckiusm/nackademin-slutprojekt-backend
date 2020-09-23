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
      
      const user = await helper.generateTestCustomer()
      const orders = await helper.generateTestOrders(user._id, 'admin')

      this.currentTest.user = user
      this.currentTest.orders = orders
    })
    
    it("Should create an order", async function() {
        const items = await helper.generateTestItems()
        const orderValue = 2497
        const resOrder = await ordersModel.createOrderForCustomer(this.test.user._id, items)
        JSON.stringify(resOrder.items[0]).should.deep.equal(
            JSON.stringify(items)
        )
    })

    it("Should get all orders", async function() {
        const items = await helper.generateTestItems()
        const orderValue = 1798

        const resAllOrders = await ordersModel.getOrders(this.test.user._id)
        JSON.stringify(resAllOrders[0].items[0]).should.deep.equal(
            JSON.stringify(this.test.orders.order1.items[0])
        )
        JSON.stringify(resAllOrders[1].items[0]).should.deep.equal(
            JSON.stringify(this.test.orders.order2.items[0])
        )
    })
})