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
const { should } = require('chai')

describe("Integration test: For testing if API is RESTful", () => {
    before( async () => {
        await database.connect();
    });

    after( async () => {
        await database.disconnect();
    });

    beforeEach(async function() {
        await ordersModel.clearOrders()
        await usersModel.clearDatabase()

        const user = await helper.generateTestCustomer();
        const orders = await helper.generateTestOrders(user._id, 'customer')
        const token = await helper.generateTokenForCustomer();
  
        this.currentTest.token = token
        this.currentTest.user = user
        this.currentTest.orders = orders
    
    });

    it('Should create an order for a user with a token with a post request', async function() {
        const items = await helper.generateTestItems()
        const orderValue = 2497

        await request(app)
        .post('/api/orders/')
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${this.test.token}`)
        .send(items)
        .then((res) => {

            res.should.have.status(201)
            JSON.stringify(res.body.items[0]).should.deep.equal(
                JSON.stringify(items)
            )
        })
    })

    it('Should create an order for a tokenless user with a post request', async function() {
        const items = await helper.generateTestItems()
        const orderValue = 2497

        await request(app)
        .post('/api/orders/')
        .set('Content-Type', 'application/json')
        .send(items)
        .then((res) => {
            expect(res).to.have.status(201)
            JSON.stringify(res.body.items[0]).should.deep.equal(
                JSON.stringify(items)
            )
        })
    })

    it('Should get all orders with a get request', async function() {
        const res = await request(app)
        .get(`/api/orders/`)
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${this.test.token}`)
        .then((res) => {
            JSON.stringify(res.body[0].items[0]).should.deep.equal(
                JSON.stringify(this.test.orders.order1.items[0])
            )
            JSON.stringify(res.body[1].items[0]).should.deep.equal(
                JSON.stringify(this.test.orders.order2.items[0])
            )
        })
    })     
})