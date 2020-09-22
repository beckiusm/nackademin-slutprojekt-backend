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
        
        const user = await helper.generateTestUser()
        const token = await helper.generateToken()
        const orders = await helper.generateTestOrders(user._id)
  
        this.currentTest.token = token
        this.currentTest.user = user
        this.currentTest.orders = orders
    
    });

    it('Should create an order with a post request', async function() {
        const items = await helper.generateTestItems()
        const orderValue = 2497

        await request(app)
        .post('/api/orders/')
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${this.test.token}`)
        .send(items)
        .then((res) => {
            // console.log("BODY: ", res.body.items)
            expect(res).to.have.status(201)
            expect(res.body.items).to.deep.include.members(
                items
            )
            expect(res.body.orderValue).to.be.equal(
                orderValue
            )
        })
    })

    it('Should get all orders with a get request', async function() {
        const res = await request(app)
        .get(`/api/orders/`)
        .set('Content-Type', 'application/json')
        .set("Authorization", `Bearer ${this.test.token}`)
        .then((res) => {
            res.body[0].orderHistory[0].items.should.deep.equal(
                this.test.orders.order1
            )
            res.body[0].orderHistory[1].items.should.deep.equal(
                this.test.orders.order2
            )
        })
    })     
})