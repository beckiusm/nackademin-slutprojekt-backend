const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String, 
    price: Number, 
    shortDesc: String,
    longDesc: String,
    imgFile: String,
}, {versionKey: false});

const Product = mongoose.model('Product', ProductSchema);

module.exports = {
	getProducts: async () => {
		try {
			return await Product.find({});
		} catch (error) {
			return(error);
		}
	},

	getProduct: async (id) => {
		try {
			return await Product.findOne({_id: id});
		} catch (error) {
			return (error);
		}
	},

	createProduct: async (title, price, shortDesc, longDesc, imgFile) => {
		try {
			const product = await Product.create({
                title, price, shortDesc: shortDesc, longDesc, imgFile
			});
			return product._doc;
		} catch (error) {
			return (error);
		}
	},


	updateProduct: async (title, price, shortDesc, longDesc, imgFile) => {
		try {
			return await Product.findByIdAndUpdate(
				id, 
				{
                    title, price, shortDesc, longDesc, imgFile
				}, 
				{new: true}
			);
		} catch (error) {
			return (error);
		}
	},

	deleteProduct: async (id) => {
		try {
			return await (await Product.deleteOne({_id: id})).deletedCount;
		} catch (error) {
			return (error);
		}
	},

	clear: async () => {
		return await Product.deleteMany({});
	},
};
