const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
	user: (req, res, next) => {
		if(!req.headers.authorization) {
			return res.sendStatus(401)
		}

		const token = req.headers.authorization.replace('Bearer ', '')
		const secret = process.env.SECRET

		try {
			const payload = jwt.verify(token, secret)
			req.user = payload
			next()
		} catch(error) {
			res.sendStatus(401)
		}
	},
	anonymous: (req, res, next) => {
		if(!req.headers.authorization) {
			return next()
		}

		const token = req.headers.authorization.replace('Bearer ', '')
		const secret = process.env.SECRET

		try {
			const payload = jwt.verify(token, secret)
			req.user = payload
			next()
		} catch(error) {
			res.sendStatus(401)
		}
	}
}