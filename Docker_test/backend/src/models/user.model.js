import pool from '../config/db.js';

// 이메일 관련 사용자 찾기
export const findByEmail = async (email) => {
  const [rows] = await pool
    .promise()
    .query('SELECT * FROM user_account WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async (userInfo) => {
  const { user_id, name, email, googleId } = userInfo;
  const sql = `
        INSERT INTO user_account (user_id, name, email, status, google_id)
        VALUES (?, ?, ?, 'INACTIVE', ?)
    `;

  const [result] = await pool
    .promise()
    .query(sql, [user_id, name, email, googleId]);
  return result.insertId;
};

export default {
  findByEmail,
  createUser,
};
