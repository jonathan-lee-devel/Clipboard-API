/**
 * config.js
 *
 * Responsible for loading configuration for the application,
 * providing a schema and validation for said configuration,
 * and for making necessary configruation information available throughout application.
 */

/* IMPORTS */
require("dotenv").config();
const env = process.env.NODE_ENV;
const convict = require("convict");

/* CONFIGURATION SCHEMA */
const config = convict({
  env: {
    format: ["prod", "dev", "test"],
    default: "dev",
    arg: "node-env",
    env: "NODE_ENV"
  },

  app_port: {
    format: Number,
    default: 8080,
    arg: "app-port",
    env: "APP_PORT"
  },

  db_host: {
    format: String,
    default: "localhost",
    env: "DB_HOST"
  },

  db_port: {
    format: Number,
    default: 27017,
    arg: "db-port",
    env: "DB_PORT"
  },

  db_name: {
    format: String,
    default: "db",
    arg: "db-name",
    env: "DB_NAME"
  }
});

if (!env) {
  const env = config.get("env");
  config.loadFile(`config/convict/${env}.json`);
  config.validate({ allowed: "strict" });
}

module.exports = config.getProperties();
