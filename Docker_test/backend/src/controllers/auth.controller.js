import crypto from 'crypto';
import url from 'url';
import https from 'https';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import redisClient from '../config/redis.js';
import { createUser, findByEmail } from '../models/user.model.js';
import { refresh, sign } from '../utils/jwt-util.js';
import axios from 'axios';

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
    prompt: 'consent',
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

      // 1) 사용자 조회/가입
      let user = await findByEmail(userInfo.email);
      if (!user) {
        // 최초 로그인: INACTIVE로 가입만 시키고 끝
        await createUser({
          user_id: undefined, // auto
          name: undefined,
          email: userInfo.email,
          status: 'INACTIVE',
        });
        console.log('이제 회원가입 완료');
        return res.redirect('/signup/pending'); // "승인 대기" 페이지
      }
      // 잠시 오픈 마인드 주석
      // if (user.status !== 'ACTIVE') {
      //   // 가입은 되어있으나 아직 승인 안됨
      //   console.log('승인대기');
      //   return res.redirect('/signup/pending');
      // }

      const payload = {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role ?? 'STUDENT',
        status: user.status,
      };
      // 사용자 정보와 Google refresh Token을 db에 저장/업데이트
      // 사용자 DB 처리: 없으면 insert, 있으면 조회

      console.log('값 이메일', payload.email);

      // const result = await createUser(userPayload);
      const userId = payload.user_id;
      console.log(userId);
      //  JWT 생성
      const accessToken = sign(payload); // 앱의 Access Token
      const refreshToken = refresh(payload); // 앱의 Refresh Token

      // Refresh Token을 Redis에 저장
      await redisClient.set(`session:${userId}`, refreshToken, {
        EX: 14 * 24 * 60 * 60, // 14일 유효기간 설정
      });

      // 쿠키
      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.redirect('/dashboard'); // spa frontend route
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

export default {
  googleAuthRedirect,
  authCallback,
  authRevoke,
  authLogout,
};
