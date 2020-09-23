require('dotenv').config()
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    role: { type: String, default: 'customer'},
    adress: {
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
    async authUser(user) {
        const email = user.email
        const registeredUser = await Users.findOne({email}).lean()
        if (registeredUser == null) {
            return {message: 'Account does not exist, please try another email'};
        }
        
        const success = await bcryptjs.compare(user.password, registeredUser.password)
        if(success) {
            const token = jwt.sign(registeredUser, process.env.SECRET)
            delete registeredUser.password;
            return {
                token: token,
                user: registeredUser
            }
        } else {
            return {message: 'Incorrect password, please try again'};
        }

    },

    async updateUserOrderHistory (id, orders) {
        try {
            const user = await Users.findByIdAndUpdate(
                id, 
                {
                    $push: { orderHistory: orders }
                }
            );
            return user.orderHistory;
        } catch (error) {
            return (error);

        }
    },

    async getUserorderHistory (id) {
        try {
            const user = await Users.findOne({_id: id});
            return user.orderHistory;
        } catch (error) {
            return error
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
}