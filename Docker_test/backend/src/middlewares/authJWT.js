import { verify } from '../utils/auth.utils.js'; // { "Authorization": "Bearer jwt-token" } 형태로 담겨옴

// { "Authorization": "Bearer jwt-token" } 형태로 담겨옴

export const authJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    if (!token) {
      return res.status(401).send({ success: false, message: '인증 필요' });
    }
    const result = verify(token);

    if (!result.success) {
      return res
        .status(401)
        .send({ success: false, message: result.message || '인증 실패' });
    }

    // token이 검증되었으면 req에 값을 세팅, 다음 콜백함수로 감
    req.user = {
      user_id: result.user_id,
      name: result.name,
      role: result.role,
    };
    next();
  } else {
    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답
    res.status(401).send({
      success: false,
      message: '토큰 없음', // jwt가 만료되었다면 메세지는 'jwt expired'!
    });
  }
};

const ROLE_ORDER = { admin: 3, professor: 2, student: 1 };

// 현재 사용자 권한이 required 중 하나 이상(같거나 더 높은 레벨)이면 통과
export const hasRole = (required) => {
  const requiredRole = Array.isArray(required) ? required : [required];
  const minRole = Math.max(
    ...requiredRole.map((r) => ROLE_ORDER[r] ?? -Infinity),
  );
  return (req, res, next) => {
    const role = req.user?.role;
    const userRole = ROLE_ORDER[role];

    if (userRole == null) {
      return res.status(403).json({ success: false, message: '비정상 접근' });
    }

    if (userRole >= minRole) return next();

    return res.status(403).json({ success: false, message: '접근권한 없음' });
  };
};
