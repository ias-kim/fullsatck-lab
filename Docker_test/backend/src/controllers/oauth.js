import http from 'http';
import https from 'https';
import url from 'url';
import crypto from 'crypto';
import express from 'express';
import session from 'express-session';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * OAuth2 인증을 사용하려면 CLIENT_ID, CLIENT_SECRET, REDIRECT_URI가 필요합니다.
 * 애플리케이션 자격 증명을 얻으려면
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);

console.log('Client ID:', process.env.GOOGLE_ID); // 추가

// Google Drive 및 Calendar의 읽기 전용 권한 범위입니다.
const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

/* 사용자 인증 정보를 저장하는 전역 변수입니다.
 */
let userCredential = null;

async function main() {
  const app = express();

  app.use(
    session({
      secret: process.env.GOOGLE_SECRET, // Replace with a strong secret
      resave: false,
      saveUninitialized: false,
    }),
  );

  // 사용자를 Google OAuth 2.0 서버로 리디렉션하는 예시입니다.
  app.get('/', async (req, res) => {
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
      // 점진적 권한 부여 활성화. 권장되는 모범 사례입니다.
      include_granted_scopes: true,
      // CSRF 공격 위험 감소를 위한 state 파라미터 포함
      state: state,
    });

    res.redirect(authorizationUrl);
  });

  // Google OAuth 2.0 서버에서 콜백을 수신합니다.
  app.get('/api/auth/callback', async (req, res) => {
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
        // access_token 및 refresh_token을 가져옵니다.
        let { tokens } = await oauth2Client.getToken(q.code);
        console.log('토큰', tokens);
        oauth2Client.setCredentials(tokens);

        /** 토큰을 전역 변수에 저장합니다. 실제 앱에서는 DB에 저장하는 것이 좋습니다. */
        userCredential = tokens;
        res.send('인증완료');
        return;

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
        console.log(error);
        res.status(500).end('Error');
      }
    }
  });

  // 토큰을 철회하는 예시
  app.get('/revoke', async (req, res) => {
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
  });

  const server = http.createServer(app);
  server.listen(3000);
}

main().catch(console.error);
