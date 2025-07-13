'use strict';

/**
 * 모듈 의존성
 */

var express = require('express');
var logger = require('morgan');
var app = (module.exports = express());
var test = app.get('env') === 'test';

// 테스트 환경이 아닐 경우 로깅 미들웨어 사용
if (!test) app.use(logger('dev'));

// 오류 핸들링 미들웨어는 인자가 4개 필요함
// 일반적인 (req, res, next) 미들웨언와는 다르게,
// (err, req, res, next) 형태를 가지며,
// 일반 미들웨어처럼 동작하지만 예외를 처리함.
// 순서에 따라 동작도 달라진다.

function error(err, req, res, next) {
  // 로그 출력
  if (!test) console.error(err.stack);

  // 500 상태 코드와 에러 메시지 응답
  res.status(500);
  res.send('Internal Server Error');
}

app.get('/', function () {
  // 루트 경로에서 에러 발생 (자동으로 에러 핸들러로 전달됨)
  throw new Error('something broke!');
});

app.get('/next', function (req, res, next) {
  // next 경로에서는 비동기 처리후 next()로 에러 전달
  // process.nextTick()은 비동기 작업 예시
  // 실제 상황에서는 DB 조회, 외부 API 호출 등이 여기에 해당
  process.nextTick(function () {
    next(new Error('oh no!'));
  });
});

// 에러 핸들보다는 라우트 뒤에 위치해야 정상적으로 동작함
// 라우트보다 위에 있으면 에러를 받을 수 없음
app.use(error);

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on part 3000');
}
