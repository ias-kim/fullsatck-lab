import pool from '../config/db.js';

// 이메일 관련 사용자 찾기
export const findByEmail = async (email) => {
  const [rows] = await pool
    .promise()
    .query('SELECT * FROM user_account WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async ({
  user_id = '242424',
  name,
  email,
  status = 'INACTIVE',
}) => {
  const sql = `
        INSERT INTO user_account (user_id, name, email, status)
        VALUES (?, ?, ?, ?)
    `;

  const [result] = await pool
    .promise()
    .query(sql, [user_id, name, email, status]);

  return { user_id: result.userInfo, name, email, status };
};

export default {
  findByEmail,
  createUser,
};
