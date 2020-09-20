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

    it('Should create an order with a post request', async function() {
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
        await ordersModel.createOrder(items)

        request(app)
        .post('/api/orders/')
        .set('Content-Type', 'application/json')
        .then((res) => {
            expect(res).to.be.json
            expect(res).to.have.status(201)
            expect(res.body).to.include({
                items: [
                    {
                        title: 'Gretas Fury'
                    },
                    {
                        title : "Swag"
                    },
                    {
                        title : "Hoodie"
                    }
                ],
                orderValue: orderValue
            })
        });
    });
});