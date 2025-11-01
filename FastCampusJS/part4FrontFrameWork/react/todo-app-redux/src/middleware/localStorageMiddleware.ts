import type { Middleware } from '@reduxjs/toolkit';

// // 10. 지속성 - 데이터를 지속적으로 저장하여 ,웹 페이지 새로고침 후에도 할 일 목록을 유지

export function createLocalStorageMiddleware(path: string) {
  const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    // action을 처리하기 전

    const result = next(action);

    // action을 처리하고 난 이후 코드
    localStorage.setItem(path, JSON.stringify(store.getState()));

    return result;
  };

  const preloadedState = JSON.parse(localStorage.getItem(path) || '{}');

  return { localStorageMiddleware, preloadedState };
}
