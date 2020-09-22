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
        
        const orders = await helper.generateTestOrders()
        const user = await helper.generateTestCustomer(orders);
        const token = await helper.generateTokenForCustomer();
  
        this.currentTest.token = token
        this.currentTest.user = user
        this.currentTest.orders = orders
    });

    it('Should create an order with a post request', function() {
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
                title : "Hoodie76",
                price : 699,
                shortDesc : "Ash unisex",
                category : "clothes",
                longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                imgFile : "hoodie-ash.png"
            }
        ]
        const orderValue = 2497
        // await ordersModel.createOrder(items)

        request(app)
        .post('/api/orders/')
        .set('Content-Type', 'application/json')
        .send(items)
        .then((res) => {
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
        .get('/api/orders/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', `application/json`)
        .then((res) => {
            this.test.orders[0].toString().should.equal(res.body[0]._id)
            this.test.orders[1].toString().should.equal(res.body[1]._id)

        })
    })     
})