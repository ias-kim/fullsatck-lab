import { refreshVerify, sign } from '../utils/jwt-util.js';
import redisClient from '../config/redis.js';
import jwt from 'jsonwebtoken';

const refresh = async (req, res) => {
  console.log(
    'All headers',
    req.headers['authorization'],
    req.headers['refresh'],
  );
  // access token과 refresh token의 존재 유무를 체크
  if (req.headers['authorization'] && req.headers['refresh']) {
    const bearer = req.headers['authorization'].split('Bearer ')[1];
    const accessToken = bearer || req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    if (!accessToken || !refreshToken) {
      res.status(401).send({ message: 'Access token not found' });
    }

    // access token을 디코딩하여 user의 정보를 가져옴.
    const decoded = jwt.decode(accessToken);

    // 디코딩 결과가 없으면 권한이 없음을 응답
    if (!decoded?.user_id) {
      res.status(401).send({
        ok: false,
        message: 'No authorized!',
      });
    }

    const saved = await redisClient.get(`rt:${decoded.user_id}`);
    if (!saved || saved !== refreshToken) {
      return res.status(401).send({ message: 'Invalid refresh token ' });
    }

    /* access token의 decoding 된 값에서
     * user id를 가져와 refresh Token을 검증*/
    const valid = refreshVerify(refreshToken, decoded.user_id);
    if (!valid)
      return res.status(401).send({ message: 'Refresh token not found' });

    const newAccess = sign(decoded);
    const rotate = true;
    if (rotate) {
      const newRT = refresh(decoded);
      await redisClient.set(`refreshToken:${decoded.user_id}`, newRT, {
        EX: 14 * 24 * 60 * 60,
      });
      res.cookie('refreshToken', newRT, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 14,
      });
    }
    res.cookie('accessToken', newAccess, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60,
    });
    return res.status(200).send({ ok: true, message: 'refreshed' });

    //   // 재발급을 위해서는 access token이 만료되어 있어야 함.
    //   if (authResult.ok === false && authResult.message === 'jwt expired') {
    //     // 1. access token이 만료되고, refresh token도 만료된 경우 -> 새로 로그인해야 함.
    //     if (refreshResult) {
    //       const newAccessToken = sign(decoded);
    //
    //       res.status(200).send({
    //         // 새로 발급한 access token과 원래 있던 refresh token 모두 클리이언트에게 반환
    //         ok: true,
    //         data: {
    //           accessToken: newAccessToken,
    //           refreshToken,
    //         },
    //       });
    //     } else {
    //       // 2. access token이 만료되고, refresh token 만료 -> 재로그인
    //       res.status(401).send({
    //         ok: false,
    //         message: 'No authorized!',
    //       });
    //     }
    //   } else if (authResult.ok) {
    //     // 3. access token이 만료되지 않은경우 => refresh 할 필요 없음.
    //     res.status(401).send({
    //       ok: false,
    //       message: 'Access token is not expired!',
    //     });
    //   }
    // } else {
    //   // access token 또는 refresh token이 헤더에 없는 경우
    //   res.status(400).send({
    //     ok: false,
    //     message: 'Access token and refresh token are need for refresh!',
    //   });
    // }
  }
};

export default { refresh };
