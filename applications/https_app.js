const express = require('express');
const https_app = express();
const logger = require('morgan');
const session = require('express-session');
const secretLoader = require('../util/secret-loader');

const FOUR_HOURS_MS = 1000 * 60 * 60 * 4;

const {
    HTTPS_PORT = 8080,
    SESSION_LIFETIME = FOUR_HOURS_MS
} = process.env;

https_app.use(logger('dev'));
https_app.set('trust proxy', 1);
https_app.use(session({
    secret: secretLoader.loadSecret('https_session_secret.txt'),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,
            sameSite: 'strict',
            maxAge: SESSION_LIFETIME 
        }
}));
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

var routes = require('../routes/https_routes');
routes(https_app);

module.exports = https_app;