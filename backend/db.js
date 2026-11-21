const path = require('path');
const mysql = require('mysql2/promise');

// Load the project-root .env file even when db.js is tested directly.
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Use the least-privilege application account by default.
// Set DB_USER and DB_PASSWORD in the project-root .env for local XAMPP.
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'taskboard_app',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskboard',
  charset: 'utf8mb4',
  dateStrings: true
};

module.exports = mysql.createPool(config);
