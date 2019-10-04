const express = require('express');
const https_app = express();
const http_app = express();
const logger = require('morgan');
const https = require('https');
const http = require('http');
const fs = require('fs');

https_app.use(logger('dev'));
https_app.use(express.json());
https_app.use(express.urlencoded({ extended: false }));

const HTTPS_PORT = 8080;

/* Route Handlers */
const indexRouter = require('./routes/index');
// Will redirect all paths to indexRouter for now
https_app.use('*', indexRouter);

/* HTTP Redirect Server */
const HTTP_PORT = 3000;
http_app.get('*', (req, res) => {
	res.redirect('https://' + req.hostname + ':' + HTTPS_PORT + req.url);
})
http.createServer(http_app).listen(HTTP_PORT);


const options = {
        key: fs.readFileSync('./secrets/key.pem'),
		cert: fs.readFileSync('./secrets/cert.pem'),
		passphrase: 'helloworld'
};

https.createServer(options, https_app).listen(HTTPS_PORT);

module.exports = https_app;
module.exports = http_app;