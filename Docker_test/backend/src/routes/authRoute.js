// Google Drive 및 Calendar의 읽기 전용 권한 범위입니다.
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const authController = require('../controllers/auth.controller.js');

export const authRouter = express.Router();

// 사용자를 Google OAuth 2.0 서버로 리디렉션하는 예시입니다.
authRouter.get('/', authController.googleAuthRedirect);

// Google OAuth 2.0 서버에서 콜백을 수신합니다.
authRouter.get('/callback', authController.authCallback);

// 토큰을 철회하는 예시
authRouter.get('/revoke', authController.authRevoke);

authRouter.get('/logout', authController.authLogout);

export default authRouter;
