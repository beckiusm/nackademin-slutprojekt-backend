const express = require('express')
const app = express()

app.use( express.static('public') )
app.use( express.json() )

// router
const orderRouter = require('./routes/orders');
// const userRouter = require('./routes/items');
// const productRouter = require('./routes/users');
app.use('/api/orders', orderRouter);
// app.use('/api/users', userRouter);
// app.use('/api/products', productRouter);

module.exports = app