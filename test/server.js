const express = require('express');
const mongoose = require('mongoose');
const item_router = require('../controllers/itemController');
const order_router = require('../controllers/orderController');
const user_router = require('../controllers/userController');
const config = require('config');

const app = express();
const cors = require('cors');

//Cors
app.use(cors());

//Body parser middleware
app.use(express.json());

// DB config
const db = config.get('mongoTestURI');

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Use router
app.use('/items', item_router);
app.use('/orders', order_router);
app.use('/users', user_router);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`server started on port ${port}`));

module.exports = server;


