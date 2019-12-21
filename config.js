/**
 * config.js
 * 
 * Responsible for loading configuration for the application, mainly ENV,
 * providing a schema and validation for said configuration,
 * and making the necessary information available throughout the rest of the application.
 */

const env = process.env.NODE_ENV;
require('dotenv').config();
const convict = require('convict');

/** CONFIGURATION SCHEMA */
const config = convict({
    env: {
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        arg: 'node-env',
        env: 'NODE_ENV'
    },

    app_port: {
        format: Number,
        default: 8080,
        arg: 'app-port',
        env: 'APP_PORT'
    },

    db_host: {
        format: String,
        default: 'localhost',
        env: 'DB_HOST'
    },

    db_port: {
        format: Number,
        default: 27017,
        arg: 'db-port',
        env: 'DB_PORT'
    },

    db_name: {
        format: String,
        default: 'db',
        arg: 'db-name',
        env: 'DB_NAME'
    }

});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);// Loads and validates appropriate configuration file
config.validate({ allowed: 'struct' });

module.exports = config.getProperties();