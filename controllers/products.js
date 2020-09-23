const permissions = require('../middleware/permissions')
const productModel = require('../models/products')

exports.getProducts = async (req, res) => {
	try {
		const products = await productModel.getProducts()
		res.json(products).status(200)
	} catch (error) {
		res.json({ error: error.message }).status(400)
	}
}

exports.getProduct = async (req, res) => {
	const id = req.params.id
	try {
		const product = await productModel.getProduct(id)
		res.json(product).status(200)
	} catch (error) {
		res.json({ error: error.message }).status(400)
	}
}

exports.createProduct = async (req, res) => {
	try {
		if (permissions.canCreateProduct(req.user) ) {
			const product = await productModel.createProduct(req.body)
			res.status(201).json(product)	
		} else {
			res.status(403)
		}
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

exports.updateProduct = async (req, res) => {
	const id = req.params.id
	if (permissions.canUpdateProduct(req.user)) {
		try {
			const product = await productModel.updateProduct(id, req.body)
			res.json(
				{
					message: `Updated product with id ${id}.`,
					product
				}).status(200)
		} catch (error) {
			res.json({ error: error.message }).status(400)
		}
	} else {
		res.sendStatus(401)
	}
}

exports.deleteProduct = async (req, res) => {
	if (permissions.canDeleteProduct(req.user)) {
		const id = req.params.id
		try {
			const product = await productModel.deleteProduct(id)
			res.json({ message: `Delete ${product} products with id ${id}.` }).status(200)
		} catch (error) {
			res.json({ error: error.message }).status(400)
		}
	} else {
		res.sendStatus(401)
	}
}

