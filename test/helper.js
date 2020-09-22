const auth = require('../middleware/auth')
const usersModel = require('../models/users')
const ordersModel = require('../models/orders')
const productModel = require('../models/products')

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
    const product = {
        title: 'Gretas Fury',
        price: 999,
        shortDesc: 'Unisex',
        longDesc: 'Skate ipsum dolor sit amet...',
        imgFile: 'skateboard-greta.png'
    }

    let productIDs = [];

    for(let i = 0; i < 3; i++) {
        let newProduct = await productModel.createProduct(product.title, product.price, product.shortDesc, product.longDesc, product.imgFile)
        productIDs.push(newProduct._id);
    }

    let order1, order2;

    let products = {items: productIDs}

    switch (typeOfUser) {
        case "customer":
        case "admin":
            order1 = await ordersModel.createOrderForCustomer(id, products)
            order2 = await ordersModel.createOrderForCustomer(id, products)
            break;
    
        case "anonymous":
            order1 = await ordersModel.createOrderForAnonymousUser(products)
            order2 = await ordersModel.createOrderForAnonymousUser(products)
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
    const product = {
        title: 'Gretas Fury',
        price: 999,
        shortDesc: 'Unisex',
        longDesc: 'Skate ipsum dolor sit amet...',
        imgFile: 'skateboard-greta.png'
    }

    let productIDs = [];

    for(let i = 0; i < 3; i++) {
        let newProduct = await productModel.createProduct(product.title, product.price, product.shortDesc, product.longDesc, product.imgFile)
        productIDs.push(newProduct._id);
    }

    return {items: productIDs};
}

module.exports = {
    generateTestOrders,
    generateTestCustomer,
    generateTestAdmin,
    generateTestItems,
    generateTokenForAdmin,
    generateTokenForCustomer
}