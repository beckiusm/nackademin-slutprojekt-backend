const Database = require('../../database/db.js');
const usersModel = require('../../models/users.js');
const bcryptjs = require('bcryptjs');
const chai = require('chai');
const { expect } = require('chai');
const helper = require('../helper');

chai.should();

describe('Users model', function() {
    before('Create a connection to database', async function() {
        await Database.connect();
    });
    
    beforeEach('Clear users database', async function() {
        await usersModel.clearDatabase();
        this.currentTest.password = '123';
    });

    after('Disconnect from the database', async function() {
        await Database.disconnect();
    });

    it('Should create a user object', async function() {
        // Arrange
        const userObject = {
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
        const createUser = await usersModel.createNewUser(userObject);
        let passwordComparison = bcryptjs.compareSync(this.test.password, createUser.password);

        // Assert
        passwordComparison.should.be.equal(true);
        createUser.should.be.an('object');
        createUser.should.to.have.keys([ 'email', 'password', 'role', 'name', 'adress', 'orderHistory', '_id' ]);
        createUser.adress.should.have.keys(['street', 'zip', 'city']);
    });


    it('find a user and return a signed token', async function() {
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
        await usersModel.createNewUser(userFields);

        const loginAttempt = {
            email: 'Email@email.com',
            password: '123',
        }
        const authUser = await usersModel.authUser(loginAttempt)

        authUser.should.be.an('object')
        authUser.token.should.be.a('string')
        authUser.user.should.be.an('object')
    })

    it('update a user', async function() {
        // Arrange
        const userObject = {
            email: 'Email@email.com',
            password: this.test.password,
            name: 'Test Smith',
            adress: {
                street: 'test street 52',
                zip: '123456',
                city: 'Testhattan'
            }
        }
        const createUser = await usersModel.createNewUser(userObject);
        const newOrder = await helper.generateTestOrders(createUser._id, 'customer');
        // Act
        updatedUser = await usersModel.updateUser(createUser._id, newOrder);
        updatedUser.should.to.have.keys([ 'email', 'password', 'role', 'name', 'adress', 'orderHistory', '_id' ]);
        updatedUser.orderHistory[0].items[0].should.deep.equal(newOrder.order1.items[0])
    })
    it('should get a user', async function() {
        const userObject = {
            email: 'Email@email.com',
            password: this.test.password,
            name: 'Test Smith',
            role: 'customer',
            adress: {
                street: 'test street 52',
                zip: '123456',
                city: 'Testhattan'
            },
            orderHistory: []
        }
        const createUser = await usersModel.createNewUser(userObject);
        const user = await usersModel.getUser(createUser._id);
        user._doc.should.to.have.keys([ 'email', 'password', 'role', 'name', 'adress', 'orderHistory', '_id' ]);
        user._doc.adress.should.have.keys(['street', 'zip', 'city']);
        user._doc.adress.should.deep.equal(userObject.adress);
        user._doc.role.should.equal(userObject.role);
        user._doc.name.should.equal(userObject.name);
        user._doc.password.should.equal(userObject.password);
        user._doc.email.should.equal(userObject.email);
    })
});