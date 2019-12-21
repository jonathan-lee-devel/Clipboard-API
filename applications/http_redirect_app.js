const express = require("express");
const http_redirect_app = express();
const logger = require("morgan");

// Express application configuration
http_redirect_app.use(logger(process.env.NODE_ENV));
http_redirect_app.use(express.json());
http_redirect_app.use(express.urlencoded({ extended: false }));

// Import and set routers appropriately
const http_redirect_router = require('../routers/http/http_redirect_router');
http_redirect_app.use('*', http_redirect_router);

module.exports = http_redirect_app;
