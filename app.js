const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const  router = require('./routes/router');

const app = express();

//Body parser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys.js').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use('/api/v1', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));

