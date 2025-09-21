import redisClient from '../config/redis.js';
import { refreshVerify, sign, signRefresh } from '../utils/auth.utils.js';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export async function refreshTokens(accessToken, refreshToken, req) {
  try {
    // 리프레쉬 토큰 자체 verify로 검증
    const decoded = jwt.verify(refreshToken, secret);
    const userId = decoded.sub;

    // 디코딩 결과가 없으면 권한이 없음을 응답
    if (!userId) {
      res.status(401).send({
        success: false,
        message: '유효하지 않은 토큰!',
      });
    }

    // RT와 Redis 일치 여부 검증
    const allTokens = await redisClient.hVals(`session:${userId}`);
    if (!allTokens || !allTokens.includes(refreshToken)) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid refresh token ' });
    }

    /* access token의 decoding 된 값에서
     * user id를 가져와 refresh Token을 검증*/
    const valid = refreshVerify(refreshToken, userId);
    if (!valid)
      return res.status(401).send({ message: 'Refresh token not found' });

    const payload = {
      user_id: user.user_id,
      name: user.name,
      role: user.role ?? 'student',
    };

    const newJti = v4();

    const newAccess = sign(payload);
    const newRf = signRefresh(payload.user_id, newJti);

    // Redis 저장
    const deviceId = req.headers['user-agent'] || 'unknown_device';
    const sessionKey = `session:${userId}`;
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    await redisClient.hSet(sessionKey, deviceId, newRf);
    await redisClient.expire(sessionKey, sevenDaysInSeconds);

    return { newAccess, newRf };
  } catch (err) {
    console.error('토큰 재발급 주 오류', err.message);
    return {
      success: false,
      status: 401,
      message: '유효하지 않은 리프레시 토큰',
    };
  }
}
