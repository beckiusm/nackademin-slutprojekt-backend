const auth = require('../middleware/auth')
const usersModel = require('../models/users')
const ordersModel = require('../models/orders')

async function generateTokenForCustomer() {
    const loginAttempt = {
        email: 'Email@email.com',
        password: '123'
    }

    const authUser = await usersModel.authUser(loginAttempt)
    return authUser.token
}

async function generateTokenForAdmin() {
    const loginAttempt = {
        email: 'kalle@email.com',
        password: '123'
    }

    const authUser = await usersModel.authUser(loginAttempt)
    return authUser.token
}

async function generateTestOrders() {
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

    return [order1._id, order2._id]
}

async function generateTestCustomer(orders) {
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

async function generateTestAdmin(orders) {
    const userFields = {
        email: 'kalle@email.com',
        password: '123',
        name: 'Kalle',
        role: 'admin',
        address: {
            street: 'Nyvägen 123',
            zip: '123456',
            city: 'Nystad'
        },
        orderHistory: orders
    }
    return await usersModel.createNewUser(userFields);
}

module.exports = {
    generateTokenForCustomer,
    generateTokenForAdmin,
    generateTestOrders,
    generateTestCustomer,
    generateTestAdmin
}