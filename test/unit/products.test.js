const chai = require('chai');
chai.should();
const db = require('../../database/db');
const productModel = require('../../models/products');

describe('product model tests', () => {
    before( async function () {
		await db.connect();
	});
	after( async function () {
		await db.disconnect();
	});
	beforeEach(async function () {
        await productModel.clear();
        // arrange
        this.currentTest.ptitle = 'Gretas Test Fury';
        this.currentTest.price = 999;
        this.currentTest.shortDesc = "Unisex";
        this.currentTest.longDesc = 'Skate ipsum dolor sit amet...';
        this.currentTest.imgFile = 'skateboard-greta.png';
    });
    it('should create a product', async function () {
        // act
        const product = await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
        // assert
        product.title.should.equal(this.test.ptitle);
        product.price.should.equal(this.test.price);
        product.shortDesc.should.equal(this.test.shortDesc);
        product.longDesc.should.equal(this.test.longDesc);
        product.imgFile.should.equal(this.test.imgFile);
        product.should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
    });
    it('should return all products', async function () {
        // arrange 
        for (let i = 0; i < 10; i++) {
            await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
        }
        // act
        const products = await productModel.getProducts();
        // assert
        products.should.be.an('array');
        products[0].should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
    });
    it('should update a product', async function () {
        // arrange
        const product = await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
        // act
        const newProduct = await productModel.updateProduct(product._id, 'Alex Fury', 1499, 'inte Unisex', 'Alex favvoskatebord', 'snyggbild.png');
        // assert
        newProduct.title.should.equal('Alex Fury');
        newProduct.price.should.equal(1499);
        newProduct.shortDesc.should.equal('inte Unisex');
        newProduct.longDesc.should.equal('Alex favvoskatebord');
        newProduct.imgFile.should.equal('snyggbild.png');
    });
    it('should delete a product', async function () {
        // arrange
        const user = this.test.user;
        const product = await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
        // act
        const deletedProduct = await productModel.deleteProduct(product._id);
        // assert
        deletedProduct.should.equal(1);
    });
});