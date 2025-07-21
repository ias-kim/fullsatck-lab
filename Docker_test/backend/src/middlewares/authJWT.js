import { verify } from '../utils/jwt-util.js';

// { "Authorization": "Bearer jwt-token" } 형태로 담겨옴

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]; // header에서 access token을 가져옴.
    const result = verify(token); // token을 검증
    if (result.ok) {
      // token이 검증되었으면 req에 값을 세팅, 다음 콜백함수로 감
      req.id = result.id;
      req.name = result.name;
      req.email = result.email;
      req.role = result.role;
      req.status = result.status;
      next();
    } else {
      // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답
      res.status(401).send({
        ok: false,
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'!
      });
    }
  }
};

export default authJWT;
