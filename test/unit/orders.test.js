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
      
      const user = await helper.generateTestUser()
      const token = await helper.generateToken()

      this.currentTest.token = token
      this.currentTest.user = user
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
        const resOrder = await ordersModel.createOrder(items)
        
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
        const items1 = [
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
        const items2 = [
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
        const order1 = await ordersModel.createOrder(items1)
        const order2 = await ordersModel.createOrder(items2)
        const orderValue1 = 1798
        const orderValue2 = 548

        this.test.user.orderHistory.push(order1._id)
        this.test.user.orderHistory.push(order2._id)

        const resAllOrders = await ordersModel.getOrders()

        expect(
            resAllOrders[0].items[0].title,
            resAllOrders[0].items[1].title,
            resAllOrders[0].orderValue,
            resAllOrders[1].items[0].title,
            resAllOrders[1].items[1].title,
            resAllOrders[1].orderValue,
            )
        .to.be.equal(
            items1[0].title,
            items1[1].title,
            orderValue1,
            items2[0].title,
            items2[1].title,
            orderValue2,
        )
    })

    it('should map authorised orders, role == customer', async function() {
        const items1 = [
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
        const items2 = [
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
        const order1 = await ordersModel.createOrder(items1)
        const order2 = await ordersModel.createOrder(items2)
        this.test.user.orderHistory.push(order1._id)

        const authOrders = permissions.mapAuthorizedOrders(this.test.user, [order1, order2])

        authOrders.should.be.an('array').with.length(1)
    })
})