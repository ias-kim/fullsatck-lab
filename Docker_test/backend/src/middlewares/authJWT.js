import jwt from 'jsonwebtoken';
import { refreshVerify, sign, verify } from '../utils/jwt-util.js';
import dotenv from 'dotenv'; // { "Authorization": "Bearer jwt-token" } 형태로 담겨옴
dotenv.config();
const secret = process.env.JWT_SECRET;
// { "Authorization": "Bearer jwt-token" } 형태로 담겨옴

const authJWT = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.refresh)
    return res.status(400).json({ message: 'no token' });

  const token = req.headers.authorization.split(' ')[1]; // header에서 access token을 가져옴.
  const result = verify(token); // token을 검증

  if (result.ok) {
    // token이 검증되었으면 req에 값을 세팅, 다음 콜백함수로 감
    req.user = {
      user_id: result.user_id,
      name: result.name,
      email: result.email,
      role: result.role,
      status: result.status,
    };
    next();
  } else {
    // 검증 실패 시 refresh token 확인
    const refreshToken = req.headers.refresh;

    const decodedAccessToken = jwt.decode(refreshToken, secret);

    const isValidRefreshToken = await refreshVerify(
      refreshToken,
      decodedAccessToken,
    );

    // refresh token 만료 -> 다시 로그인
    if (!isValidRefreshToken)
      return res.status(400).json({ message: 'refresh token is not valid' });

    const newAccessToken = sign({ user_id: decodedAccessToken });

    res.cookie('AccessToken', newAccessToken, {
      httpOnly: true,
    });
    res.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
    });

    req.user_id = decodedAccessToken.user_id;

    return next();
  }
};

export default authJWT;
