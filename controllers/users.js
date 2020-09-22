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
            res.status(201).json(createUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    authUser: async function(req, res) {
        try {
            const fields = {
                email: req.body.email,
                password: req.body.password
            }
            res.json(await usersModel.authUser(fields)).status(200)
        } catch (error) {
            res.sendStatus(400)
        }

        res.status(200)
    }
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