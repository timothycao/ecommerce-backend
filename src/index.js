const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const config = require('config');

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

const port = config.get('port');
app.listen(port, () => console.log(`Listening on port ${port}...`));