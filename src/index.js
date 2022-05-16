const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');

const db = config.get('db');
mongoose.connect(db);

const app = express();

// logging middleware
app.use(morgan('dev'));

// security middleware
app.use(helmet());

// cors middleware
app.use(cors());

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes middleware
app.use('/api/auth', require('./routes/auth'));
app.use('/api/me', require('./routes/me'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/subcategories', require('./routes/subcategories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/productvariants', require('./routes/productVariants'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/carts', require('./routes/carts'));
app.use('/api/orders', require('./routes/orders'));

const port = config.get('port');
app.listen(port, () => console.log(`Listening on port ${port}...`));