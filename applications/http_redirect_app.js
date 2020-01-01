/**
 * http_redirect_app.js
 * 
 * Instance of Express server/application,
 * sole purpose is to redirect all incoming HTTP traffic to HTTPS application.
 */

/* IMPORTS */
const express = require('express');
const http_redirect_app = express();
const logger = require('morgan');

// Import and set routers appropriately
const http_redirect_router = require('../routers/http/http_redirect_router');
http_redirect_app.use('*', http_redirect_router);

module.exports = http_redirect_app;