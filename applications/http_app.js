const express = require('express');
const http_app = express();
const logger = require('morgan');

http_app.use(logger('dev'));
http_app.use(express.json());
http_app.use(express.urlencoded({ extended: false }));

const HTTPS_PORT = 8080;

/* HTTP Redirect Server */
http_app.get('*', (req, res) => {
	res.redirect('https://' + req.hostname + ':' + HTTPS_PORT + req.url);
});

module.exports = http_app;