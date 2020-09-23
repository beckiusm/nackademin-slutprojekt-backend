const chai = require('chai')
chai.should()
const db = require('../../database/db')
const productModel = require('../../models/products')

describe('product model tests', function() {
	before( async function () {
		await db.connect()
	})
	after( async function () {
		await db.disconnect()
	})
	beforeEach(async function () {
		await productModel.clear()
		// arrange
		this.currentTest.productObject = 
		{
			title: 'Gretas Test Fury',
			price: 999,
			shortDesc: 'Unisex',
			longDesc: 'Skate ipsum dolor sit amet...',
			imgFile: 'skateboard-greta.png'
		}
	})
	it('should create a product', async function () {
		// act
		const product = await productModel.createProduct(this.test.productObject)
		// assert
		product.toString().should.deep.equal(this.test.productObject.toString())
		product.should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile'])
	})
	it('should return all products', async function () {
		// arrange 
		for (let i = 0; i < 10; i++) {
			await productModel.createProduct(this.test.productObject)
		}
		// act
		const products = await productModel.getProducts()
		// assert
		products.should.be.an('array')
		products[0].should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile'])
	})
	it('should update a product', async function () {
		// arrange
		const product = await productModel.createProduct(this.test.productObject)
		// act
		const newProductObject = {
			title: 'Alex Fury',
			price: 1499, 
			shortDesc: 'inte Unisex', 
			longDesc: 'Alex favvoskatebord', 
			imgFile: 'snyggbild.png'
		}
		const newProduct = await productModel.updateProduct(product._id, newProductObject)
		// assert
		newProduct.toString().should.deep.equal(newProductObject.toString())
	})
	it('should delete a product', async function () {
		// arrange
		const product = await productModel.createProduct(this.test.productObject)
		// act
		const deletedProduct = await productModel.deleteProduct(product._id)
		// assert
		deletedProduct.should.equal(1)
	})
})