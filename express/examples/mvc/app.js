'use strict';

/**
 * 모듈 의존성
 */

var express = require('express');
var logger = require('morgan');
var path = require('node:path');
var session = require('express-session');
var methodOverride = require('method-override');

var app = (module.exports = express());

// 기본 템플릿 엔진을 "ejs"로 설정
// 파일 확장자를 명시하지 않아도 렌더링 가능
app.set('view engine', 'ejs');

// 에러 및 404 페이지에 사용할 뷰 경로 설정
app.set('views', path.join(__dirname, 'views'));

// 커스텀 res.message() 메서드 정의
// 메시지를 세션에 저장하기 위해 사용
app.response.message = function (msg) {
  // this.req를 통해 req.session에 접근
  var sess = this.req.session;
  // 메시지를 배열로 저장
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};

// 로그 설정 (단독 실행 시만 로그 출력)
if (!module.parent) app.use(logger('dev'));

// 정적 파일 제공 (public 폴더 기준)
app.use(express.static(path.join(__dirname, 'public')));

// 세션 지원 설정
app.use(
  session({
    resave: false, // 수정되지 않은 세션은 저장하지 않음
    saveUninitialized: false, // 저장된 데이터가 없으면 세션 생성하지 않음
    secret: 'some secret here',
  }),
);

// 요청 본문 파싱 (req. body 사용 가능하게 함)
app.use(express.urlencoded({ extended: true }));

// ?_method=put 와 같이 쿼리로 HTTP 메서드 오버라이드 허용
app.use(methodOverride('_method'));

// 메시지 데이터를 템플릿에 노출
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];

  // messages 변수를 뷰에서 사용할 수 있게 함
  res.locals.messages = msgs;

  // hasMessages 변수도 함께 전달
  res.locals.hasMessages = !!msgs.length;

  /**
   * res.locals({
   *     messages: msg,
   *     hasMessages: !! msgs.length
   * }
   */
  next();
  // 메시지 플러시: 다음 요청에 노출되지 않도록 초기화
  req.session.messages = [];
});

// 컨트롤러 로딩
require('./lib/boot')(app, { verbose: !module.parent });

// 에러 처리 미들웨어
app.use(function (err, req, res, next) {
  // 로그 출력 (직접 실행된 경우만)
  if (!module.parent) console.error(err.stack);

  // 500 에러 페이지 렌더링
  res.status(500).render('5xx');
});

// 어떤 미들웨어도 응답하지 않았다면 404 처리
app.use(function (req, res, next) {
  res.status(404).render('404', { url: req.originalUrl });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
