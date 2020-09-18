require('dotenv').config()
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'customer', required: true },
    address: {
        street: { type: String, required: true },
        zip: { type: String, required: true },
        city: { type: String, required: true }
    },
    orderHistory: { type: Array, default: Array }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = {
    async createNewUser(userObject) {
        try {
            bcryptjs.hashSync(userObject.password, 10);
            let newUser = await Users.create(userObject);
            return newUser;
        } catch (error) {
            return error;
        }
    }
    /*,
    async signInUser(userObject) {
        try {
            let findUser = await Users.find({email: userObject.email});
            if (bcryptjs.compareSync(userObject.password, findUser.password)) {
                const token = jwt.sign( { user: { email: findUser.email, name: findUser.name, role: findUser.role, address: findUser.address } }, process.env.SECRET );
                return token;
            } else {
                return {message: 'Incorrect password, please try again'};
            }
        } catch (error) {
            return error;
        }
    }
    */
}