const app = require('../../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
chai.should()
const ordersModel = require('../../models/orders')
const database = require('../../database/db')
const usersModel = require('../../models/users')
const helper = require('../helper')

describe('Integration test: For testing if API is RESTful', function() {
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
		const orders = await helper.generateTestOrders(user._id, 'customer')
		const token = await helper.generateTokenForCustomer()
  
		this.currentTest.token = token
		this.currentTest.user = user
		this.currentTest.orders = orders
    
	})

	it('Should create an order for a user with a token with a post request', async function() {
		const items = await helper.generateTestItems()

		await request(app)
			.post('/api/orders/')
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${this.test.token}`)
			.send(items)
			.then((res) => {
				res.should.have.status(201)
				res.body.items.toString().should.deep.equal(
					items.items.toString()
				)
			})
	})

	it('Should create an order for a tokenless user with a post request', async function() {
		const items = await helper.generateTestItems()

		await request(app)
			.post('/api/orders/')
			.set('Content-Type', 'application/json')
			.send(items)
			.then((res) => {
				expect(res).to.have.status(201)
				res.body.items.toString().should.deep.equal(
					items.toString()
				)
			})
	})

	it('Should get all orders with a get request', async function() {
		await request(app)
			.get('/api/orders/')
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${this.test.token}`)
			.then((res) => {
				res.body[0].items.toString().should.deep.equal(
					this.test.orders.order1.items.toString()
				)
				res.body[1].items.toString().should.deep.equal(
					this.test.orders.order2.items.toString()
				)
			})
	})     
})