const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const config = require('config');
const cors = require('cors');

const app = express();

//Cors
app.use(cors());

//Body parser middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Use router
app.use('/api/v1', router);

const port = process.env.PORT || 5000;

module.exports = app.listen(port, () => console.log(`server started on port ${port}`));

