const express = require('express');
const http_app = express();
const logger = require('morgan');

http_app.use(logger('dev'));
http_app.use(express.json());
http_app.use(express.urlencoded({ extended: false }));

var routes = require('../routes/http_routes');
routes(http_app);

module.exports = http_app;