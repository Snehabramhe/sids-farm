const express = require('express'); // import express library
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const {productRouter} = require("./routes/product.route");
const {userRouter} = require('./routes/user.route');
const {cartRouter} = require('./routes/cart.route');
const {addressRouter} = require("./routes/address.route");
const {orderRouter} = require("./routes/order.route");
const {paymentRouter} = require("./routes/payment.route");

const app = express(); // initialize the express

/**
 * config .env file
 */
dotenv.config({
    path: __dirname + '/.env',
});
app.use(cors()); // CORS policy

/**
 * config express to read form-data
 */
app.use(express.json());

/**
 * http://localhost:9000/
 */
app.get('/', (request, response) => {
    response.json({
        message: 'Welcome to the Express server!',
    });
});

/**
 * connect to MongoDB Database
 */
const mongoDBUrl = process.env.MONGO_DB_URL;
const database = process.env.MONGO_DATABASE;
if (!database || !mongoDBUrl) {
    console.error('MongoDB URL is missing');
    return process.exit(1);
}

mongoose.connect(mongoDBUrl, {
    dbName: database
}).then(() => {
    console.log('Connected to the MongoDB!');
}).catch((err) => {
    console.error(err, 'MongoDB connection error');
    process.exit(1);
})

/**
 * router configuration
 */
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payments', paymentRouter);

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.listen(port, hostname, () => {
    console.log(`Server started at ${hostname}:${port}`);
});



