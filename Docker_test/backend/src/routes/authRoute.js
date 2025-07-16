import { Router } from 'express';
import passport from '../auth/passport.js'; // import passport from our custom passport file
// import * as AuthService from '../services/AuthService'; // assuming you have a service
import jwt from 'jsonwebtoken';

const router = Router();

const token = jwt.sign(
  { id: user.id, email: user.email, jwtSecureCode: 'ff' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' },
);
/*
  This route triggers the Google sign-in/sign-up flow.
  When the frontend calls it, the user will be redirected to the
  Google accounts page to log in with their Google account.
*/
// Google OAuth2.0 route
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent',
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      const user = req.user; // 여기 user는 verify 함수에서 만든 더미 유저임

      // 1. 더미용 secureCode 생성 (실제 서비스에서는 DB에서 가져옴)
      const dummyJwtSecureCode = 'mock-code';

      // 2. JWT payload 구성
      const payload = {
        id: user.id,
        email: user.email,
        jwtSecureCode: dummyJwtSecureCode, // 이건 검증할 때도 쓰임
      };

      // 3. JWT 서명
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret-test', {
        expiresIn: '1h',
      });

      // 4. 클라이언트로 응답
      return res.json({ token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'An error occurred during authentication', error });
    }
  },
);
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { session: false }),
//   (req, res) => {
//     try {
//       const user = req.user;
//       const { authToken } = AuthService.handleGoogleCallback({
//         id: user.id,
//         email: user.email,
//       });
//       const redirectUrl = `${process.env.BE_BASE_URL}?accessToken=${authToken}`;
//       return res.redirect(redirectUrl);
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: 'An error occurred during authentication' });
//     }
//   },
// );

export default router;

// // 루트 페이지
// app.get('/', (req, res) => {
//   res.send(`
//         <h1>Login</h1>
//         <a href="/google">login </a>
//     `);
// });
//
// // 로그인 버튼을 누르면 도착하는 목적지 라우터
// // 모든 로직을 처리한 뒤 구글 인증 서버 https://accounts.google.com/o/oauth2/v2/auth
// app.get('/google', (req, res) => {
//   let url = 'https://accounts.google.com/o/oauth/v2/auth?';
//   url += `client_id=${GOOGLE_CLIENT_ID}`;
//   url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
//   url += `&response_type=code`;
//   url += `&scope=openid%20email&20profile`;
//   url += `&access_type=offline`;
//   url += `&prompt=consent`;
//   res.redirect(url);
// });
//
// app.get('/auth/callback', (req, res) => {
//   const { code } = req.query;
//   console.log(`code: ${code}`);
//   res.send('ok');
// });
