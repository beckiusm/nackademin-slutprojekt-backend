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
            const products = await Product.find({}).lean();
            return products;
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


	updateProduct: async (id, title, price, shortDesc, longDesc, imgFile) => {
		try {
		    const product = await Product.findByIdAndUpdate(
				id, 
				{
                    title, price, shortDesc, longDesc, imgFile
				}, 
				{new: true}
            );
            return product;
		} catch (error) {
			return (error);
		}
	},

	deleteProduct: async (id) => {
		try {
            const product = await Product.deleteOne({_id: id})
            return product.deletedCount;
		} catch (error) {
			return (error);
		}
	},

	clear: async () => {
		return await Product.deleteMany({});
	},
};
