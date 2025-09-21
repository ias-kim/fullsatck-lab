import { createProfessor, createStudent } from '../models/auth.model.js';

export const registerUser = async (userData) => {
  try {
    const isStudent = userData.is_student;
    console.log('학생 여부', isStudent);

    if (isStudent === true) {
      return await createStudent(userData);
    }
    return await createProfessor(userData);
  } catch (err) {
    console.error('잘못된 입력', err.stack);
    throw new Error('회원등록 실패');
  }
};

export function checkUserStatus(status) {
  switch (status) {
    case 'active':
      return { success: true };
    case 'inactive':
      return {
        success: false,
        http: 403,
        message: '거절된 사용자입니다.',
        redirect: '/',
      };
    case 'pending':
      return {
        success: false,
        http: 403,
        message: '대기중인 사용자입니다.',
        redirect: '/',
      };
    default:
      return {
        success: false,
        http: 401,
        message: '사용자 상태를 확인 불가능합니다.',
        redirect: '/',
      };
  }
}
