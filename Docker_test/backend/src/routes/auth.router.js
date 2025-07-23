import express from 'express';
import dotenv from 'dotenv';
import authController from '../controllers/auth.controller.js';
import refreshController from '../controllers/refresh.controller.js';
import authJwt from '../middlewares/authJWT.js';

dotenv.config();

export const authRouter = express.Router();

// 사용자를 Google OAuth 2.0 서버로 리디렉션하는 예시입니다.
authRouter.get('/', authController.googleAuthRedirect);

// Google OAuth 2.0 서버에서 콜백을 수신합니다.
authRouter.get('/callback', authController.authCallback);

// 토큰을 철회하는 예시
authRouter.get('/revoke', authController.authRevoke);

authRouter.get('/logout', authController.authLogout);

authRouter.post('/dashboard', authJwt, (req, res) => {
  console.log(
    'decoded user from token:',
    req.user.user_id,
    req.user.name,
    req.user.email,
  );
  return res.status(200).json({
    message: 'Success',
    user: {
      user_id: req.user.user_id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status,
    },
  });
});
authRouter.post('/refresh', refreshController.refresh);

export default authRouter;
