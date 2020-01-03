/**
 * db.js
 * 
 * Responsible for defining/configuring database connectivity for application,
 * intended to be platform-independent.
 */

const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;