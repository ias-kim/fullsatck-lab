const pool = require('../config/db.js');

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM user_account WHERE email = ?',
      [email],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.length > 0 ? resolve[0] : null);
      },
    );
  });
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

module.exports = findByEmail;
