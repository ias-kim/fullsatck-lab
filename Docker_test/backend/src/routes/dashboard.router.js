import express from 'express';
import { authJWT, hasRole } from '../middlewares/authJWT.js';

const router = express.Router();

router.get('/', authJWT, hasRole('student'), (req, res) => {
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

export default router;
