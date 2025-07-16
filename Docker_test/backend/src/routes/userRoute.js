import { Router } from 'express';
import requireJwt from '../middlewares/requireJwt.js';

const router = Router();

router.get('/', requireJwt, async (req, res) => {
  try {
    const user = req.user;

    // 더미 유저 정보 응답
    const veryVerySecretUserInfo = {
      id: user.id,
      email: user.email,
      message: '이 정보는 JWT 인증된 사용자!',
    };

    return res.status(200).json({ veryVerySecretUserInfo });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while fetching user info',
      error,
    });
  }
});

export default router;
