const permissions = require('../middleware/permissions')
const productModel = require('../models/products')

module.exports = {
	getProducts: async (req, res) => {
		try {
			const products = await productModel.getProducts()
			res.status(200).json(products)
		} catch (error) {
			res.json({ error: error.message }).status(400)
		}
	},

	getProduct: async (req, res) => {
		const id = req.params.id
		try {
			const product = await productModel.getProduct(id)
			res.status(200).json(product)
		} catch (error) {
			res.json({ error: error.message }).status(400)
		}
	},

	createProduct: async (req, res) => {
		try {
			if (permissions.canCreateProduct(req.user) ) {
				const product = await productModel.createProduct(req.body)
				res.status(201).json({product})	
			} else {
				res.status(403)
			}
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	},

	updateProduct: async (req, res) => {
		const id = req.params.id
		if (permissions.canUpdateProduct(req.user)) {
			try {
				const product = await productModel.updateProduct(id, req.body)
				res.status(200).json(
					{
						message: `Updated product with id ${id}.`,
						product
					})
			} catch (error) {
				res.json({ error: error.message }).status(400)
			}
		} else {
			res.sendStatus(401)
		}
	},

	deleteProduct: async (req, res) => {
		if (permissions.canDeleteProduct(req.user)) {
			const id = req.params.id
			try {
				const product = await productModel.deleteProduct(id)
				res.status(200).json({ message: `Deleted ${product} product with id ${id}.` })
			} catch (error) {
				res.json({ error: error.message }).status(400)
			}
		} else {
			res.sendStatus(401)
		}
	}
}

