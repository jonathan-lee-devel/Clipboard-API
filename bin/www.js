/**
 * www.js
 *
 * Entry point for the node.js application,
 * initializes all necessary Express application instances,
 * setting ports as well as listening/error events appropriately
 */

/* IMPORTS */
require('../config/config');
const fs = require('fs');
const http = require("http");
const https = require("https");
const debug = require('debug')('test:server');
const https_app = require("../applications/https_app");
const http_redirect_app = require("../applications/http_redirect_app");

/* CREATE & CONFIGURE HTTPS APPLICATION */
// Configure application port
const https_port = normalize_port(process.env.HTTPS_PORT);
https_app.set("port", https_port);

// Configure SSL
const https_options = {
  key: fs.readFileSync(process.env.HTTPS_SSL_KEY, 'utf8'),
  cert: fs.readFileSync(process.env.HTTPS_SSL_CERT, 'utf8'),
  passphrase: process.env.HTTPS_SSL_PASSPHRASE
};

// Create "error" event listener
https_on_error = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof https_port === "string"
      ? `Pipe ${https_port}`
      : `Port ${https_port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated priveleges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

// Create "listen" event listener
https_on_listening = () => {
  var addr = https_server.address();
  var bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`HTTPS_ON_LISTENING: ${bind}`);
};

// Create application server
const https_server = https.createServer(https_options, https_app);
https_server.listen(https_port);
https_server.on("error", https_on_error);
https_server.on("listening", https_on_listening);

/* CREATE & CONFIGURE HTTP REDIRECT APPLICATION */
// Configure application port
const http_redirect_port = normalize_port(process.env.HTTP_REDIRECT_PORT);
http_redirect_app.set("port", http_redirect_port);

// Create "error" event listener
http_redirect_on_error = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof https_port === "string"
      ? `Pipe ${https_port}`
      : `Port ${https_port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated priveleges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

// Create "listen" event listener
http_redirect_on_listening = () => {
  var addr = https_server.address();
  var bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`HTTPS_ON_LISTENING: ${bind}`);
};

// Create server
const http_redirect_server = http.createServer(http_redirect_app);
http_redirect_server.listen(http_redirect_port);
http_redirect_server.on("error", http_redirect_on_error);
http_redirect_server.on("listening", http_redirect_on_listening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalize_port(val) {
  var port = parseInt(val, 10);

  if (isNaN(port))
    // Named pipe
    return val;

  if (port >= 0)
    // Port number
    return port;

  return false;
}
