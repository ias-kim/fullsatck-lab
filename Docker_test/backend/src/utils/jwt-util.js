import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

// ESM 방식 export로 전체 함수 묶어서 내보내기
export const sign = (user) => {
  const payload = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '30s',
  });
};

export const verify = (req) => {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, secret);
    return {
      ok: true,
      user_id: decoded.user_id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      status: decoded.status,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
};

export const refresh = () => {
  return jwt.sign({}, secret, {
    algorithm: 'HS256',
    expiresIn: '14d',
  });
};

export const refreshVerify = async (token, userId) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);
  try {
    const data = await getAsync(userId);
    if (token === data) {
      try {
        jwt.verify(token, secret);
        return true;
      } catch (err) {
        console.warn('JWT 검증 실패:', err.message);
        return false;
      }
    }
    return false;
  } catch (err) {
    console.warn('Redis 확인 실패', err.message);
    return false;
  }
};
