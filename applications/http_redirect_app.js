const express = require("express");
const http_redirect_app = express();
const logger = require("morgan");

http_redirect_app.use(logger("dev"));
http_redirect_app.use(express.json());
http_redirect_app.use(express.urlencoded({ extended: false }));

var routes = require("../routes/http_routes");
routes(http_redirect_app);

module.exports = http_redirect_app;
