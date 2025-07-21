const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 30,
  host: 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection(function (err) {
  if (err) {
    console.error('Error connecting', err.stack);
    return;
  }

  console.log('connected as id ' + pool.threadId);
});
