'use strict';

// 모듈 의존성

var express = require('express');
var app = (module.exports = express());
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// 커스텀 로그 포맷 (테스트 환경이 아닐 경우에만 로깅)
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'));

// 요청의 쿠키를 파싱함
// req.cookies 와 req.signedCookies 를 채움
// 시크릿 키가 주어지면 서명된 쿠키를 처리할 수 있음.
app.use(cookieParser('my secret here'));

// parses x-www-form-url-urlencoded 형식의 요청 본문을 파싱함
app.use(express.urlencoded());

// 루트 경로 요청
app.get('/', function (req, res) {
  if (req.cookies.remember) {
    res.send('Remembered :). Click to a <a href="/forget">forget</a>!.');
  } else {
    res.send(
      '<form method="post"><p>Check to <label>' +
        '<input type="checkbox" name="remember"/> remember me</label>' +
        '<input type="submit" value="Submit"/>.</p></form>',
    );
  }
});

// 쿠키 제거 후 리다이렉트
app.get('/forget', function (req, res) {
  res.clearCookie('remember');
  res.redirect(req.get('Referrer') || '/');
});

// 폼 전송 처리
app.post('/', function (req, res) {
  var minute = 60000;

  if (req.body && req.body.remember) {
    res.cookie('remember', 1, { maxAge: minute });
  }

  res.redirect(req.get('Referrer') || '/');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
