import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 30,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'gsc_portal',
  charset: 'utf8mb4',
});

// pool.getConnection(function (err) {
//   if (err) {
//     console.error('Error connecting', err.stack);
//     return;
//   }
//
//   console.log('connected as id ' + pool.threadId);
// });

export default pool;
