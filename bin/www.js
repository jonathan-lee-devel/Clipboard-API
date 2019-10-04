#!/usr/bin/env node

const https_app = require('../app/https_app');
const http_app = require('../app/http_app');

var debug = require('debug')('untitled:server');
const https = require('https');
const http = require('http');
const fs = require('fs');

/**
 * Get port from environment and store in Express.
 */
const https_port = normalizePort(process.env.PORT || '8080');
const http_port = normalizePort(process.env.PORT || '3000');
https_app.set('port', https_port);
http_app.set('port', http_port);

/**
 * Create HTTPS and HTTP redirect server
 */
const load_passphrase = fs.readFileSync('./secrets/passphrase.txt', 'utf-8', function(err, data) {
  if( err ) throw err;
  else
  return data.toString();
});

const https_options = {
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem'),
  passphrase: load_passphrase
};
const https_server = https.createServer(https_options, https_app);
const http_server = http.createServer(http_app);

/**
 * Listen on provided port, on all network interfaces.
 */
https_server.listen(https_port);
https_server.on('error', https_onError);
https_server.on('listening', https_onListening);

http_server.listen(http_port);
http_server.on('error', http_onError);
http_server.on('listening', http_onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTPS server "error" event.
 */

function https_onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof https_port === 'string'
    ? 'Pipe ' + https_port
    : 'Port ' + https_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTPS server "listening" event.
 */

function https_onListening() {
  var addr = https_server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Event listener for HTTP server "error" event.
 */

function http_onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof http_port === 'string'
    ? 'Pipe ' + http_port
    : 'Port ' + http_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function http_onListening() {
  var addr = http_server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
