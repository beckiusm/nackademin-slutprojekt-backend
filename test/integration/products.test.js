const app = require('../../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const db = require('../../database/db');
const productModel = require('../../models/products');
const usersModel = require('../../models/users.js');
const helper = require('../helper');
const { request } = chai;

describe('product integration test', () => {
	before( async function () {
		await db.connect();
	});
	after( async function () {
		await db.disconnect();
	});
	beforeEach(async function () {
		await productModel.clear();
		await usersModel.clearDatabase();
        // arrange
        this.currentTest.ptitle = 'Gretas Test Fury';
        this.currentTest.price = 999;
        this.currentTest.shortDesc = "Unisex";
        this.currentTest.longDesc = 'Skate ipsum dolor sit amet...';
		this.currentTest.imgFile = 'skateboard-greta.png';
		
        const orders = await helper.generateTestOrders()
		const user = await helper.generateTestAdmin(orders)
		const token = await helper.generateTokenForAdmin()
		
        this.currentTest.token = token
        this.currentTest.user = user
        this.currentTest.orders = orders
	});
	it('should create a product', async function () {
		const fields = {title: 'Gretas Test Fury', price: 999, shortDesc: 'Unisex', longDesc: 'Skate ipsum dolor sit amet...', imgFile: 'skateboard-greta.png'};
		await request(app)
			.post('/api/products/')
			.set('Content-Type', 'application/json')
			.set('Authorization', 'Bearer ' + this.test.token)
			.send(fields)
			.then((res) => {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
			});
	});
	it('should get a product', async function () {
		const product = await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
		await request(app)
			.get(`/api/products/${product._id}`)
			.set('Content-Type', 'application/json')
			.then((res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
			});
	});
	it('should update product', async function () {
		const product = await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
		console.log('Product: ', product)
		const fields = {title: 'Alex Fury', price: 9399, shortDesc: 'Inte Unisex', longDesc: 'Skate nånting nånting..', imgFile: 'skateboard-alex.png'};
		await request(app)
			.patch(`/api/products/${product._id}`)
			.set('Authorization', 'Bearer ' + this.test.token)
			.set('Content-Type', 'application/json')
			.set('Authorization', 'Bearer ' + this.test.token)
			.send(fields)
			.then((res) => {
				console.log('RES.BODY.PRODUCT: ', res.body.product)
				res.should.have.status(200);
				res.should.be.json;
				res.body.product.should.have.keys(['_id', 'title', 'price', 'shortDesc', 'longDesc', 'imgFile']);
			});
	});
	it('should delete product', async function () {
		const product = await productModel.createProduct(this.test.ptitle, this.test.price, this.test.shortDesc, this.test.longDesc, this.test.imgFile);
		await request(app)
			.delete(`/api/products/${product._id}`)
			.set('Authorization', 'Bearer ' + this.test.token)
			.set('Content-Type', 'application/json')
			.then((res) => {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.keys(['message']);
			});
	});
});