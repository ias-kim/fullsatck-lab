import { verify } from '../utils/jwt-util.js'; // { "Authorization": "Bearer jwt-token" } 형태로 담겨옴

// { "Authorization": "Bearer jwt-token" } 형태로 담겨옴

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const bearer = req.headers.authorization.split(' ')[1]; // header에서 access token을 가져옴.
    const fromCookie = req.cookies?.accessToken;
    const token = bearer || fromCookie;

    if (!token) {
      return res.status(401).send({ ok: false, message: 'Token is missing' });
    }
    const result = verify(token);
    if (!result.ok) {
      return res
        .status(401)
        .send({ ok: false, message: result.message || 'jwt expired' });
    }
    if (result.status !== 'ACTIVE') {
      return res.status(403).send({ ok: false, message: 'Not approved yet' });
    }
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
      // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답
      res.status(401).send({
        ok: false,
        message: 'Token is missing', // jwt가 만료되었다면 메세지는 'jwt expired'!
      });
    }
  }
};

export default authJWT;
