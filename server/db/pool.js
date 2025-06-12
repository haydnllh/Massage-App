const { Pool } = require("pg");
const dotenv = require("dotenv").config();

module.exports = new Pool({
    connectionString: process.env.POSTGRESQL_URL
});