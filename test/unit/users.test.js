const Database = require('../../database/db.js')
const usersModel = require('../../models/users.js')
const chai = require('chai');
const { expect } = require('chai');

chai.should();

describe('Users model', function() {
    before('Create a connection to database', async function() {
        await Database.connect();
    });
    
    beforeEach('Clear users database', async function() {
        await usersModel.clearDatabase();
    });

    after('Disconnect from the database', async function() {
        await Database.disconnect();
    });

    it('Should create a user object', async function() {
        // Arrange
        let userObject = {
            email: 'Email@email.com',
            password: '123',
            name: 'Test Smith',
            address: {
                street: 'test street 52',
                zip: '123456',
                city: 'Testhattan'
            }
        }

        // Act
        let createUser = await usersModel.createNewUser(userObject);
        console.log(createUser);
        // Assert
        createUser.should.be.an('object');
        createUser.should.to.have.keys([ 'email', 'password', 'role', 'name', 'address', 'orderHistory', '_id' ]);
        createUser.address.should.have.keys(['street', 'zip', 'city']);
    });
});