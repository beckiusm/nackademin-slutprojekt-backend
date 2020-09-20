const app = require('../../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
chai.should()
const ordersModel = require('../../models/orders')
const database = require('../../database/db')

describe("Integration test: For testing if API is RESTful", () => {
    before( async () => {
        await database.connect();
    });

    after( async () => {
        await database.disconnect();
    });

    beforeEach(async function() {
        await ordersModel.clearOrders()
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
        const order1 = [
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
            }
        ]
        const order2 = [
            {
                title : "Wave",
                price : 249,
                shortDesc : "Medium",
                longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                imgFile : "wheel-wave.png"
            },
            {
                title : "Rocket",
                price : 299,
                category : "wheels",
                shortDesc : "Hard",
                longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                imgFile : "wheel-rocket.png"
            }
        ]
        
        await ordersModel.createOrder(order1)
        await ordersModel.createOrder(order2)
        
        const res = await request(app)
        .get('/api/orders/')
        .set('Content-Type', 'application/json')
        // .set("Authorization", "Bearer " + this.test.token)
        console.log("RES: ", res.body);
        expect(res.body).to.deep.include.members({
            order1,
            order2
        })
    })     
})