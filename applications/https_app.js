const express = require('express');
const https_app = express();
const logger = require('morgan');

https_app.use(logger('dev'));
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

var routes = require('../routes/https_routes');
routes(https_app);

module.exports = https_app;