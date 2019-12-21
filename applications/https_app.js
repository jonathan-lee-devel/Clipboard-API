const express = require("express");
const https_app = express();
const logger = require("morgan");
const session = require("express-session");

https_app.use(logger("dev"));
https_app.set("trust proxy", 1);
https_app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: "strict", maxAge: process.env.SESSION_LIFETIME }
  })
);
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

// Import and set routers appropriately
const https_index_router = require('../routers/https/https_index_router');
const https_user_router = require('../routers/https/https_user_router');
const https_customer_router = require('../routers/https/https_customer_router');

https_app.use('/', https_index_router);
https_app.use('/users', https_user_router);
https_app.use('/customers', https_customer_router);

module.exports = https_app;
