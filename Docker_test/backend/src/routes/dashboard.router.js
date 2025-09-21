import express from 'express';
import { authWithRole } from '../middlewares/authJWT.js';

const router = express.Router();

router.get('/', authWithRole('student'), (req, res) => {
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
      role: req.user.role,
    },
  });
});

export default router;
