require('dotenv').config()
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    role: { type: String, default: 'customer'},
    address: {
        street: { type: String },
        zip: { type: String },
        city: { type: String }
    },
    orderHistory: { type: Array, default: [] }
}, { versionKey: false });

const Users = mongoose.model('Users', usersSchema);

module.exports = {
    async createNewUser(userObject) {
        try {
            let hashPassword = bcryptjs.hashSync(userObject.password, 10);
            userObject.password = hashPassword;
            let newUser = await Users.create(userObject);
            return newUser._doc;
        } catch (error) {
            return error;
        }
    },
    async clearDatabase() {
        try {
            let clearDB = await Users.deleteMany({});
            return clearDB.deletedCount;
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