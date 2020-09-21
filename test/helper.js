const auth = require('../middleware/auth')
const usersModel = require('../models/users')

async function generateToken() {
    const loginAttempt = {
        email: 'Email@email.com',
        password: '123'
    }

    const authUser = await usersModel.authUser(loginAttempt)
    return authUser.token
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
        }
    }
    return await usersModel.createNewUser(userFields);
}

module.exports = {
    generateTestUser,
    generateToken
}