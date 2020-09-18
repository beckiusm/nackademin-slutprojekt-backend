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
        this.currentTest.title = 'Gretas Test Fury';
        this.currentTest.price = 999;
        this.currentTest.shortDesc = "Unisex";
        this.currentTest.longDesc = 'Skate ipsum dolor sit amet...';
        this.currentTest.imgFile = 'skateboard-greta.png';
    });
    it('should create a product', async function () {
        // act
        const product = await productModel.createProduct(this.test.title, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
        // assert
        product.title.should.equal(this.test.title);
        product.price.should.equal(this.test.price);
        product.shortDesc.should.equal(this.test.shortDesc);
        product.longDesc.should.equal(this.test.longDesc);
        product.imgFile.should.equal(this.test.imgFile);
        product.should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
    });
    it('should return all products', async function () {
        // arrange 
        for (let i = 0; i < 10; i++) {
            await productModel.createProduct(this.test.title, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
        }
        // act
        const products = await productModel.getProducts();
        console.log(products);
        // assert
        products.should.be.an('array');
        products[0].should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
    });
        // it('should update a product', async function () {
        //     // arrange
        //     const user = this.test.user;
        //     const product = await productModel.createProduct(productObj, user._id);
        //     // act
        //     const newTitle = randString();
        //     await productModel.updateList(product._id, newTitle);
        //     // assert
        //     const updatedList = await productModel.getList(product._id);
        //     updatedList.list[0].title.should.equal(newTitle);
        // });
        // it('should delete a product', async function () {
        //     // arrange
        //     const user = this.test.user;
        //     const product = await productModel.createProduct(randString(), user._id);
        //     for (let i = randNumber(); i < 10; i++) {
        //         await itemModel.createItem(randString(), randBool(), moment().format(), product._id);
        //     }
        //     const list = await productModel.getList(product._id);
        //     // act
        //     const deletedList = await productModel.deleteList(product._id);
        //     // assert
        //     deletedList.list.should.equal(1);
        //     deletedList.items.should.equal(list.items.length);
        // });
});