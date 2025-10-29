import pool from '../config/db.js';

export const findNoticeQuery = async () => {
  try {
    const [rows] = await pool.query(`SELECT *
                                         FROM v_notice_list`);
    return rows;
  } catch {
    throw new Error('Failed to find notice');
  }
};
