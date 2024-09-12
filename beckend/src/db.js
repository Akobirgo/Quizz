const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.MONGO_URL,
});

module.exports = pool;