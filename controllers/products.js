const productModel = require('../models/products');

exports.getProducts = async (req, res) => {
	try {
		const products = await productModel.getProducts();
		res.json(products).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.getProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const product = await productModel.getProduct(id);
		res.json(product).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.createProduct = async (req, res) => {
	const { title, price, shortDesc, longDesc, imgFile } = req.body;
	try {
		const product = await productModel.createProduct(title, price, shortDesc, longDesc, imgFile);
		res.status(201).json(product);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.updateProduct = async (req, res) => {
	const id = req.params.id;
	const { title, price, shortDesc, longDesc, imgFile } = req.body;
	try {
		const product = await productModel.updateProduct(id, title, price, shortDesc, longDesc, imgFile);
		res.json(
			{
				message: `Updated product with id ${id}.`,
				product
			}).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.deleteProduct = async (req, res) => {
	// if (req.user.role === 'admin') {
		const id = req.params.id;
		try {
			const product = await productModel.deleteProduct(id);
			res.json({ message: `Delete ${product} products with id ${id}.` }).status(200);
		} catch (error) {
			res.json({ error: error.message }).status(400);
		}
	// } else {
	// 	res.sendStatus(401);
	// }
};

