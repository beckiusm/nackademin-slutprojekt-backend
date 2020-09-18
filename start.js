const app = require('./app')
const db = require('./database/db');
const port = process.env.PORT || 3000;

db.connect().then( () => 
	app.listen(port, () => console.log(`Running app on port ${port}`))
);