const chai = require('chai')
chai.should()
const ordersModel = require('../../models/orders')
const usersModel = require('../../models/users')
const database = require('../../database/db')
const helper = require('../helper')

describe('Unit test: ordersmodel', function() {
	before( async function() {
		await database.connect()
	})

	after( async function() {
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
    
	it('Should create an order', async function() {
		const items = await helper.generateTestItems()
		const resOrder = await ordersModel.createOrderForCustomer(this.test.user._id, items)
		resOrder.items[0].toString().should.deep.equal(
			items.toString()
		)
	})

	it('Should get all orders', async function() {
		const resAllOrders = await ordersModel.getOrders(this.test.user._id)
		resAllOrders[0].items[0].toString().should.deep.equal(
			this.test.orders.order1.items[0].toString()
		)
		resAllOrders[1].items[0].toString().should.deep.equal(
			this.test.orders.order2.items[0].toString()
		)
	})
})