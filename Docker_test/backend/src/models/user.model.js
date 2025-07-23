import pool from '../config/db.js';

// 이메일 관련 사용자 찾기
export const findByEmail = async (email) => {
  const [rows] = await pool
    .promise()
    .query('SELECT * FROM user_account WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async (userInfo) => {
  const {
    user_id = '2423008',
    name = 'kim',
    email,
    status = 'INACTIVE',
    googleId,
  } = userInfo;

  // 이미 존재하는지 확인
  const existing = await findByEmail(email);
  if (existing) {
    throw new Error('이미 가입된 사용자입니다.');
  }

  const sql = `
        INSERT INTO user_account (user_id, name, email, status, google_id)
        VALUES (?, ?, ?, ?, ?)
    `;

  await pool.promise().query(sql, [user_id, name, email, status, googleId]);

  return {
    user_id,
    name,
    email,
    status,
    googleId,
  };
};

export default {
  findByEmail,
  createUser,
};
