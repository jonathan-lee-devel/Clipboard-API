/**
 * config.js
 * 
 * Responsible for loading configuration for the application, mainly ENV,
 * and making the necessary information available throughout the rest of the application.
 */

const env = process.env.NODE_ENV;
require('dotenv').config();
const convict = require('convict');

const config = convict({
    env: {
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        arg: 'node-env',
        env: 'NODE_ENV'
    },

    /** PRODUCTION CONFIGURATION */
    prod_app_port: {
        format: Number,
        default: 8080,
        arg: 'prod-app-port',
        env: 'PROD_APP_PORT'
    },
    prod_db_host: {
        format: String,
        default: 'localhost',
        env: 'PROD_DB_HOST'
    },
    prod_db_port: {
        format: Number,
        default: 27017,
        arg: 'prod-db-port',
        env: 'PROD_DB_PORT'
    },
    prod_db_name: {
        format: String,
        default: 'db',
        arg: 'prod-db-name',
        env: 'PROD_DB_NAME'
    },

    /** DEVELOPMENT CONFIGURATION */
    dev_app_port: {
        format: Number,
        default: 8080,
        arg: 'dev-app-port',
        env: 'DEV_APP_PORT'
    },
    dev_db_host: {
        format: String,
        default: 'localhost',
        env: 'DEV_DB_HOST'
    },
    dev_db_port: {
        format: Number,
        default: 27017,
        arg: 'dev-db-port',
        env: 'DEV_DB_PORT'
    },
    dev_db_name: {
        format: String,
        default: 'db',
        arg: 'dev-db-name',
        env: 'DEV_DB_NAME'
    },

    /** TEST CONFIGURATION */
    test_app_port: {
        format: Number,
        default: 8080,
        arg: 'test-app-port',
        env: 'TEST_APP_PORT'
    },
    test_db_host: {
        format: String,
        default: 'localhost',
        env: 'TEST_DB_HOST'
    },
    test_db_port: {
        format: Number,
        default: 27017,
        arg: 'test-db-port',
        env: 'TEST_DB_PORT'
    },
    test_db_name: {
        format: String,
        default: 'db',
        arg: 'test-db-name',
        env: 'TEST_DB_NAME'
    }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);
config.validate({ allowed: 'struct' });

module.exports = config.getProperties();