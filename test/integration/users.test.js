const app = require('../../app.js')
const Database = require('../../database/db.js')
const usersModel = require('../../models/users.js')

const chai = require('chai')
const chaiHttp = require('chai-http')
const { request } = require('chai')

chai.should()
chai.use(chaiHttp)

describe('Users HTTP requests', function(){
	before('Create a connection to database', async function() {
		await Database.connect()
	})
    
	beforeEach('Clear users database', async function() {
		await usersModel.clearDatabase()
		this.currentTest.password = '123'
	})

	after('Disconnect from the database', async function() {
		await Database.disconnect()
	})

	it('Should send a POST request with user data in the body and then return the newly created user object', async function(){
		// Arrange
		let userObject = {
			email: 'Email@email.com',
			password: this.test.password,
			name: 'Test Smith',
			adress: {
				street: 'test street 52',
				zip: '123456',
				city: 'Testhattan'
			}
		}

		// Act
		await request(app)
			.post('/api/register/')
			.set('Content-Type', 'application/json')
			.send(userObject)
			.then((res) => {
				res.should.have.status(201)
				res.body.should.have.keys(['token', 'user'])
				res.body.user.should.have.keys(['email', 'role', 'name', 'adress', 'orderHistory', '_id' ])
				res.body.user.adress.should.have.keys(['zip', 'city', 'street' ])
			})
	})


	it('should send a POST request with an login attempt and send back an object with token and user', async function() {
		const userFields = {
			email: 'Email@email.com',
			password: '123',
			name: 'Test Smith',
			adress: {
				street: 'test street 52',
				zip: '123456',
				city: 'Testhattan'
			}
		}
		await usersModel.createNewUser(userFields)

		const loginAttempt = {
			email: 'Email@email.com',
			password: '123',
		}

		await request(app)
			.post('/api/auth/')
			.set('Content-Type', 'application/json')
			.send(loginAttempt)
			.then((res) => {
				res.should.have.status(200)
				res.body.should.have.keys(['token', 'user'])
				res.body.user.should.have.keys(['email', 'role', 'name', 'adress', 'orderHistory', '_id' ])
				res.body.user.adress.should.have.keys(['zip', 'city', 'street' ])
			})
	})

})