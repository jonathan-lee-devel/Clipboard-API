const express = require('express');
const https_app = express();
const logger = require('morgan');

https_app.use(logger('dev'));
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

/* Route Handlers */
const indexRouter = require('../routes/index');
// Will redirect all paths to indexRouter for now

var routes = require('../routes/https_routes');
// https_app.use('*', indexRouter);
routes(https_app);

module.exports = https_app;