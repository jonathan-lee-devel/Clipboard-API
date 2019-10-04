const express = require('express');
const https_app = express();
const logger = require('morgan');
const https = require('https');
const fs = require('fs');

https_app.use(logger('dev'));
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

/* Route Handlers */
const indexRouter = require('./routes/index');
// Will redirect all paths to indexRouter for now
https_app.use('*', indexRouter);

module.exports = https_app;