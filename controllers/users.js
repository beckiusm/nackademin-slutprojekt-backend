const usersModel = require('../models/users.js');

module.exports = {
    createNewUser: async function(req, res) {
        try {
            let userObject = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                role: req.body.role,
                address: {
                    street: req.body.address.street,
                    zip: req.body.address.zip,
                    city: req.body.address.city                    
                }
            }
            let createUser = await usersModel.createNewUser(userObject);
            return res.status(201).json(createUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    /*,
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
    */
}