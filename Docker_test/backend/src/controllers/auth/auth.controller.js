import crypto from 'crypto';
import url from 'url';
import https from 'https';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import redisClient from '../../config/redis.js';
import { findAuthEmail, findByEmail } from '../../models/auth.model.js';
import { sign, signRefresh } from '../../utils/auth.utils.js';
import axios from 'axios';
import { checkUserStatus, registerUser } from '../../services/user.service.js';
import { v4 } from 'uuid';

dotenv.config();

const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);

/* 사용자 인증 정보를 저장하는 전역 변수
 */
let userCredential = null;

// 사용자를 Google OAuth 2.0 서버로 리디렉션
async function googleAuthRedirect(req, res) {
  // CSRF 방지를 위한 보안 상태 문자열 생성
  const state = crypto.randomBytes(32).toString('hex');
  // 세션에 상태 값을 저장
  req.session.state = state;

  // 사용 권한을 요청하는 인증 URL 생성
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (기본값) 또는 'offline' (refresh_token 발급)
    access_type: 'offline',
    /** 위에 정의된 scopes 배열 전달.
     * 하나의 권한만 필요하면 문자열로 전달 가능 */
    scope: scopes,
    // 점진적 권한 부여 활성화. 권장되는 모범 사례
    include_granted_scopes: true,
    // CSRF 공격 위험 감소를 위한 state 파라미터 포함
    state,
    // prompt: 'consent',
  });
  console.log('auth url', authorizationUrl);

  res.redirect(authorizationUrl);
}

async function authCallback(req, res) {
  // OAuth 2.0 서버 응답 처리
  let q = url.parse(req.url, true).query;

  if (q.error) {
    // 에러 응답 처리 (예: error=access_denied)
    console.log('Error:' + q.error);
  } else if (q.state !== req.session.state) {
    // state 값 검증
    console.log('State mismatch. Possible CSRF attack');
    res.end('State mismatch. Possible CSRF attack');
  } else {
    try {
      // Google로부터 토큰 받기
      const { tokens } = await oauth2Client.getToken(q.code);
      console.log('받은 토큰', tokens);
      const { data: userInfo } = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        { headers: { Authorization: `Bearer ${tokens.access_token}` } },
      );

      if (!userInfo.email.endsWith('@g.yju.ac.kr')) {
        let authUser = await findAuthEmail(userInfo.email);

        if (!authUser) {
          console.log('유효한 이메일이 아닙니다.');
          return res.redirect('/');
        }
      }

      // 1) 사용자 조회/가입
      let user = await findByEmail(userInfo.email);

      // DB 유저가 없을 경우 회원가입 페이지 이동
      if (!user) {
        req.session.ouathUser = {
          email: userInfo.email,
        };
        // 최초 로그인시 회원가입 페이지로 이동
        return res.redirect('/api/auth/register'); // 회원가입 페이지
      }
      const verdict = checkUserStatus(user.status);

      // 비승인 접근 거절
      if (!verdict.success) {
        if (verdict.redirect) return res.redirect(verdict.redirect);
        return res
          .status(verdict.http)
          .json({ success: false, message: verdict.message });
      }

      if (user) {
        const payload = {
          user_id: user.user_id,
          name: user.name,
          role: user.role ?? 'student',
        };
        const jti = v4();
        //  JWT 생성
        const accessToken = sign(payload); // 앱의 Access Token
        const refreshToken = signRefresh(payload.user_id, jti); // 앱의 Refresh Token

        // 학번 추출
        const userId = payload.user_id;
        // 1. 요청 헤더에서 기기 정보 가져오기
        const deviceId = req.headers['user-agent'] || 'unknown_device';

        // 2. Redis Hash에 리프레시 토큰 저장
        const sessionKey = `session:${userId}`;
        const sevenDaysInSeconds = 7 * 24 * 60 * 60;
        await redisClient.hSet(sessionKey, deviceId, refreshToken);
        await redisClient.expire(sessionKey, sevenDaysInSeconds);

        // await redisClient.set(`session:${userId}`, refreshToken, {
        //   EX: 7 * 24 * 60 * 60 * 1000, // 7일
        // });

        // 쿠키에 토큰 설정 응답
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60,
        });
        res.redirect('/api/dashboard'); // spa frontend route
      }

      if (
        tokens.scope.includes(
          'https://www.googleapis.com/auth/calendar.readonly',
        )
      ) {
        console.log('Calendar scope granted');
      } else {
        console.log('Calendar scope NOT granted');
      }
    } catch (error) {
      console.error('OAuth Callbackk Error', error);
      res.status(500).json({ message: '인증 처리 중 오류가 발생' });
    }
  }
}

// 토큰 철회 함수
async function authRevoke(req, res) {
  // POST 요청을 위한 데이터 문자열 생성
  let postData = 'token=' + userCredential.access_token;

  // POST 요청 옵션 설정
  let postOptions = {
    host: 'oauth2.googleapis.com',
    port: '443',
    path: '/revoke',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  // 요청 객체 설정
  const postReq = https.request(postOptions, function (res) {
    res.setEncoding('utf8');
    res.on('data', (d) => {
      console.log('Response: ' + d);
    });
  });

  postReq.on('error', (error) => {
    console.log(error);
  });

  // 데이터와 함께 요청 전송
  postReq.write(postData);
  postReq.end();
}

async function authLogout(req, res, next) {
  try {
    const userId = req.user?.id;
    if (userId) {
      await redisClient.del(userId.toString());
    }
    req.logout(() => res.redirect('/'));
  } catch (err) {
    next(err);
  }
}

async function registerAfterOAuth(req, res) {
  try {
    const s = req.session.ouathUser;
    if (!s) {
      return res
        .status(400)
        .json({ message: '세션이 만료되었습니다. 다시 로그인하세요' });
    }
    const { user_id, name, phone, is_student } = req.body;

    const userPayload = {
      user_id,
      name,
      phone,
      is_student,
      email: s.email,
    };

    await registerUser(userPayload);

    res.redirect('/'); // spa frontend route
  } catch (err) {
    console.error('등록 에러', err);
    throw new Error('ouath 인증 후 등록 실패');
  }
}

export default {
  googleAuthRedirect,
  authCallback,
  authRevoke,
  authLogout,
  registerAfterOAuth,
};
