const app = require('../../app.js');
const Database = require('../../database/db.js');
const usersModel = require('../../models/users.js');
const bcryptjs = require('bcryptjs');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.should();
chai.use(chaiHttp);

describe('Users HTTP requests', function(){
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

    it('Should send a POST request with user data in the body and then return the newly created user object', async function(){
        // Arrange
        let userObject = {
            email: 'Email@email.com',
            password: this.test.password,
            name: 'Test Smith',
            address: {
                street: 'test street 52',
                zip: '123456',
                city: 'Testhattan'
            }
        };

        // Act
        const response = await chai.request(app)
        .post('/api/users/register/')
        .set('Content-Type', 'application/json')
        .send(userObject);
        
        // Assert
        (bcryptjs.compareSync(this.test.password, response.body.password)).should.equal(true);
        response.should.have.status(201);
        response.body.should.have.keys(['email', 'password', 'role', 'name', 'address', 'orderHistory', '_id' ]);
        response.body.address.should.have.keys(['street', 'zip', 'city']);
    });

});