#!/usr/bin/env node

/* IMPORTS */
const https_app = require("../applications/https_app");
const http_redirect_app = require("../applications/http_redirect_app");
const debug = require("debug")("test:server");
const https = require("https");
const http = require("http");

/* CREATE & CONFIGURE HTTPS SERVER/APPLICATION */

// Configure application port
const https_port = normalizePort(process.env.HTTPS_PORT || "8080");
https_app.set("port", https_port);

// Configure SSL
const https_options = {
  key: process.env.HTTPS_SSL_KEY,
  cert: process.env.HTTPS_SSL_CERT,
  passphrase: process.env.HTTPS_SSL_PASSPHRASE
};

// Create server
const https_server = https.createServer(https_options, https_app);
https_server.listen(https_port);
https_server.on("error", https_onError);
https_server.on("listening", https_onListening);

/* CREATE & CONFIGURE HTTP REDIRECT SERVER/APPLICATION */

// Confiugre application port
const http_redirect_port = normalizePort(process.env.HTTP_PORT || "3000");
http_redirect_app.set("port", http_redirect_port);

// Create server
const http_redirect_server = http.createServer(http_redirect_app);
http_redirect_server.listen(http_redirect_port);
http_redirect_server.on("error", http_redirect_onError);
http_redirect_server.on("listening", http_redirect_onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // Named pipe
    return val;
  }

  if (port >= 0) {
    // Port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTPS server "error" event.
 */
function https_onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof https_port === "string"
      ? "Pipe " + https_port
      : "Port " + https_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
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
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("HTTPS_Listening on " + bind);
}

/**
 * Event listener for HTTP server "error" event.
 */
function http_redirect_onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof http_redirect_port === "string"
      ? "Pipe " + http_redirect_port
      : "Port " + http_redirect_port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function http_redirect_onListening() {
  var addr = http_redirect_server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("HTTP_Listening on " + bind);
}
