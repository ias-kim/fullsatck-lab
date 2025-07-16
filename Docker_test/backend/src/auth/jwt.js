// jwt.js
import { ExtractJwt, Strategy } from 'passport-jwt';
// import User from '../database/models/User'; // mock user class
import bcrypt from 'bcrypt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret-test',
};

async function verify(payload, done) {
  /*
                    이 시스템에서 유효한 JWT는 `id`와 `jwtSecureCode`를 반드시 포함해야 합니다.
                    JWT 생성 방식은 원하는 대로 정의할 수 있습니다.
                      */
  // bad path: JWT가 유효하지 않음
  if (!payload?.id || !payload?.jwtSecureCode) {
    return done(null, false);
  }

  // JWT payload에 있는 `id`를 이용해 사용자 검색
  const user = await User.findOne({
    where: {
      id: payload.id,
    },
  });

  // 잘못된 경우: 사용자를 찾을 수 없음
  if (!user) {
    return done(null, false);
  }

  // 사용자 객체의 jwtSecureCode와 JWT payload의 jwtSecureCode를 비교
  // 잘못된 경우: 위조된 JWT 또는 무효한 토큰
  if (!bcrypt.compareSync(user.jwtSecureCode, payload.jwtSecureCode)) {
    return done(null, false);
  }

  // 정상적인 경우: JWT가 유효하며 사용자를 인증함
  return done(null, user);
}

export default new Strategy(options, verify);
