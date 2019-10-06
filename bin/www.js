#!/usr/bin/env node

const https_app = require("../applications/https_app");
const http_app = require("../applications/http_app");

const debug = require("debug")("untitled:server");
const https = require("https");
const http = require("http");
const secretLoader = require("../util/secret-loader");

/**
 * Get port from environment and store in Express.
 */
const https_port = normalizePort(process.env.HTTPS_PORT || "8080");
const http_port = normalizePort(process.env.HTTP_PORT || "3000");
https_app.set("port", https_port);
http_app.set("port", http_port);

/**
 * Create HTTPS Server
 */
const https_options = {
  key: secretLoader.loadSecret("key.pem"),
  cert: secretLoader.loadSecret("cert.pem"),
  passphrase: secretLoader.loadSecret("passphrase.txt")
};
const https_server = https.createServer(https_options, https_app);

/**
 * Create HTTP Redirect Server
 */
const http_server = http.createServer(http_app);

/**
 * Configure HTTPS Server to Listen on HTTPS PORT
 */
https_server.listen(https_port);
https_server.on("error", https_onError);
https_server.on("listening", https_onListening);

/**
 * Configure HTTP Redirect Server to Listen on HTTP PORT
 */
http_server.listen(http_port);
http_server.on("error", http_onError);
http_server.on("listening", http_onListening);

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

function http_onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof http_port === "string" ? "Pipe " + http_port : "Port " + http_port;

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

function http_onListening() {
  var addr = http_server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("HTTP_Listening on " + bind);
}
