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

async function generateTestOrders(id, typeOfUser = 'anonymous') {
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

    let order1, order2;

    switch (typeOfUser) {
        case "customer":
        case "admin":
            order1 = (await ordersModel.createOrderForCustomer(id, items1)).items
            order2 = (await ordersModel.createOrderForCustomer(id, items2)).items
            break;
    
        case "anonymous":
            order1 = (await ordersModel.createOrderForAnonymousUser(items1)).items
            order2 = (await ordersModel.createOrderForAnonymousUser(items2)).items
            break;

        default:
            break;
    }

    return {order1, order2}
}

async function generateTestCustomer() {
    const userFields = {
        email: 'Email@email.com',
        password: '123',
        name: 'Test Smith',
        adress: {
            street: 'test street 52',
            zip: '123456',
            city: 'Testhattan'
        }
    }
    return await usersModel.createNewUser(userFields);
}


async function generateTestAdmin() {
    const userFields = {
        email: 'kalle@email.com',
        password: '123',
        name: 'Kalle',
        role: 'admin',
        adress: {
            street: 'Nyvägen 123',
            zip: '123456',
            city: 'Nystad'
        }
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
    generateTestOrders,
    generateTestCustomer,
    generateTestAdmin,
    generateTestItems,
    generateTokenForAdmin,
    generateTokenForCustomer
}