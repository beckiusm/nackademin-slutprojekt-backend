const Database = require('../../database/db.js');
const usersModel = require('../../models/users.js');
const bcryptjs = require('bcryptjs');
const chai = require('chai');
const { expect } = require('chai');

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
});