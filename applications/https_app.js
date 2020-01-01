/**
 * https_app.js
 * 
 * Instance of Express server/application,
 * primary application which will respond to all valid HTTPS API requests.
 */
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const https_app = express();

// Express application configuration
https_app.use(logger('dev'));
https_app.set('trust proxy', 1);
https_app.use(
    session({
        secret: process.env.HTTPS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, sameSite: 'strict', maxAge: process.env.HTTPS_COOKIE_MAX_AGE }
    })
);
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

// Import and set routers appropriately
const https_index_router = require('../routers/https/https_index_router');
const https_user_router = require('../routers/https/https_user_router');

https_app.use('/users', https_user_router);
https_app.use('/', https_index_router);

module.exports = https_app;