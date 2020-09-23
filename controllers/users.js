const usersModel = require('../models/users.js')

module.exports = {
	createNewUser: async function(req, res) {
		try {
			let userObject = {
				email: req.body.email,
				password: req.body.password,
				name: req.body.name,
				role: req.body.role,
				adress: {
					street: req.body.adress.street,
					zip: req.body.adress.zip,
					city: req.body.adress.city                    
				}
			}
			let loginObject = {
				email: req.body.email,
				password: req.body.password
			}
			await usersModel.createNewUser(userObject)
			let userSignIn = await usersModel.authUser(loginObject)
			res.status(201).json(userSignIn)
		} catch (error) {
			res.status(500).json(error)
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
	}
}