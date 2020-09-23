
const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.DB
let mongoDatabase
const {MongoMemoryServer} = require('mongodb-memory-server')
switch (process.env.ENVIRONMENT) {
case 'staging':
case 'development':
	mongoDatabase = {
		getUri: async () => 
			`${db}`
	}
	break
case 'test':
	mongoDatabase = new MongoMemoryServer({binary: {version: '4.4.1'}})
	break
}

async function connect(){
    
	let uri = await mongoDatabase.getUri()

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
}

async function disconnect(){
	await mongoose.disconnect()
	if(process.env.ENVIRONMENT == 'test'){
		await mongoDatabase.stop()
	}
}

module.exports = {
	connect, disconnect
}