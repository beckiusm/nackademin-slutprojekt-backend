const usersModel = require('../models/users.js');

module.exports = {
    createNewUser: async function(req, res) {
        try {
            let userObject = {
                username: req.body.email,
                password: req.body.password
            }
            let createUser = await usersModel.createNewUser(userObject);
            return createUser;
        } catch (error) {
            return error;
        }
    },
    signInUser: async function(req, res) {
        try {
            let userObject = {
                username: req.body.email,
                password: req.body.password
            };
            let signInUser = await usersModel.signInUser(userObject);
            return signInUser;
        } catch (error) {
            return error;
        }
    }
}