const app = require('express')();
const https = require('https');
const fs = require('fs');

const PORT = 8080;

// GET home route
app.get('/', (req, res) => {
		res.writeHead(200);
        res.end('Sent from Clipboard API v1');
});

const options = {
        key: fs.readFileSync('./secrets/key.pem'),
		cert: fs.readFileSync('./secrets/cert.pem'),
		passphrase: 'helloworld'
};

https.createServer(options, app).listen(PORT);
