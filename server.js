const app = require('express')();
const httpApp = require('express')();
const https = require('https');
const fs = require('fs');

// HTTP Redirect Server
const HTTP_PORT = 3000;
const http = require('http');
httpApp.get('*', (req, res) => {
	res.redirect('https://' + req.hostname + ':8080' + req.url);
})
http.createServer(httpApp).listen(HTTP_PORT);


const PORT = 8080;

// GET home route
app.get('/', (req, res) => {
		res.writeHead(200);
        res.end('Sent from Clipboard API v1 - ' + new Date());
});

const options = {
        key: fs.readFileSync('./secrets/key.pem'),
		cert: fs.readFileSync('./secrets/cert.pem'),
		passphrase: 'helloworld'
};

https.createServer(options, app).listen(PORT);