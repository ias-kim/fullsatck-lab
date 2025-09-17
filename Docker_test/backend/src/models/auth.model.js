import pool from '../config/db.js';
import redisClient from '../config/redis.js';
import jwtf from '../utils/jwt-util.js';

export const login = async (req, res) => {
  // user 로직

  if (success) {
    // access token과 refresh token을 발급
    const accessToken = jwtf.sign(user);
    const refreshToken = jwtf.refresh();

    // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장
    redisClient.set(user.id, refreshToken);

    res.status(200).send({
      ok: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } else {
    res.status(401).send({
      ok: false,
      message: 'password is incorrect',
    });
  }
};

const inputUser = (user) => {
  const { user_id, name, email, status, phone, refresh_token } = user;
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO user_account (user_id, name, email, status, phone, refresh_token) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, name, email, status, phone, refresh_token],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      },
    );
  });
};

const updateUser = (user) => {};
pool.updateUser = async (err, connection) => {
  if (err) throw err;
  connection.query(
    'UPDATE user_account WHERE user_id = ?',
    function (err, results) {
      if (err) throw err;
      console.log('changed' + results.changedRows + ' rows');
    },
  );
};

const deleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM user_account WHERE user_id = ?',
      [user_id],
      (err, result) => {
        if (err) throw reject(err);
        resolve(result.affectedRows);
      },
    );
  });
};

// module.exports = findByEmail;
