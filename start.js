const app = require('./app')
const db = require('./database/db');

db.connect().then( () => 
	app.listen(port, () => console.log(`Running app on port ${port}`))
);