const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    HOST: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;