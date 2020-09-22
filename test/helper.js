const auth = require('../middleware/auth')
const usersModel = require('../models/users')
const ordersModel = require('../models/orders')

async function generateToken() {
    const loginAttempt = {
        email: 'Email@email.com',
        password: '123'
    }

    const authUser = await usersModel.authUser(loginAttempt)
    return authUser.token
}

async function generateTestOrders(id) {
    const items1 = [
        {
            title: 'Gretas Fury',
            price: 999,
            category: "board",
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        },
        {
            title : "Swag",
            price : 799,
            category : "board",
            shortDesc : "Unisex",
            longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
            imgFile : "skateboard-generic.png"
        }
    ]
    const items2 = [
        {
            title : "Rocket",
            price : 299,
            category : "wheels",
            shortDesc : "Hard",
            longDesc : "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
            imgFile : "wheel-rocket.png"
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
    
    const order1 = (await ordersModel.createOrder(id, items1)).items
    const order2 = (await ordersModel.createOrder(id, items2)).items

    return {order1, order2}
}

async function generateTestUser() {
    const userFields = {
        email: 'Email@email.com',
        password: '123',
        name: 'Test Smith',
        address: {
            street: 'test street 52',
            zip: '123456',
            city: 'Testhattan'
        },
        orderHistory: orders
    }
    return await usersModel.createNewUser(userFields);
}

async function generateTestItems() {
    return items = [
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
}

module.exports = {
    generateTestUser,
    generateToken,
    generateTestOrders,
    generateTestItems
}