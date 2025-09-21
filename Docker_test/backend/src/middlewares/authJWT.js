import { verify } from '../utils/auth.utils.js'; // { "Authorization": "Bearer jwt-token" } 형태로 담겨옴
import { ForbiddenError, UnauthenticatedError } from '../errors/index.js';

const ROLE_ORDER = { admin: 3, professor: 2, student: 1 };
export const authWithRole = (requiredRole = 'student') => {
  return (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new UnauthenticatedError(
        '로그인 정보가 유효하지 않습니다. 다시 로그인하세요.',
      );
    }

    const result = verify(token);
    if (!result.success) {
      return res
        .status(401)
        .json({ success: false, message: result.message || '인증 실패' });
    }

    req.user = {
      user_id: result.user_id,
      role: result.role,
    };

    const userRoleValue = ROLE_ORDER[req.user.role] ?? 0;
    const requiredRoleValue = ROLE_ORDER[requiredRole];

    if (userRoleValue >= requiredRoleValue) {
      return next();
    }

    throw new ForbiddenError('접근 권한이 없습니다. 관리자에게 문의하세요.');
  };
};

// export const authJWT = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (token) {
//     if (!token) {
//       return res.status(401).send({ success: false, message: '인증 필요' });
//     }
//     const result = verify(token);
//
//     if (!result.success) {
//       throw new UnauthenticatedError(
//         '로그인 정보가 유효하지 않습니다. 다시 로그인하세요.',
//       );
//     }
//
//     // token이 검증되었으면 req에 값을 세팅, 다음 콜백함수로 감
//     req.user = {
//       user_id: result.user_id,
//       name: result.name,
//       role: result.role,
//     };
//     next();
//   } else {
//     // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답
//     if (!result.success) {
//       throw new UnauthenticatedError(
//         '로그인 정보가 유효하지 않습니다. 다시 로그인하세요.',
//       );
//     }
//   }
// };
//

//
// // 현재 사용자 권한이 required 중 하나 이상(같거나 더 높은 레벨)이면 통과
// export const hasRole = (required) => {
//   const requiredRole = Array.isArray(required) ? required : [required];
//   const minRole = Math.max(
//     ...requiredRole.map((r) => ROLE_ORDER[r] ?? -Infinity),
//   );
//   return (req, res, next) => {
//     const role = req.user?.role;
//     const userRole = ROLE_ORDER[role];
//
//     if (userRole == null) {
//       throw new ForbiddenError('접근 권한이 없습니다. 관리자에게 문의하세요.');
//     }
//
//     if (userRole >= minRole) return next();
//
//     return throw new ForbiddenError(
//       '접근 권한이 없습니다. 관리자에게 문의하세요.',
//     );
//   };
// };
