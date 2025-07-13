'use strict';

/**
 * 모듈 의존성
 */

var express = require('express');
var path = require('node:path');
var app = (module.exports = express());
var logger = require('morgan');
var silent = process.env.NODE_ENV === 'test';

// 일반 설정
app.set('views', path.join(__dirname, 'views'));
console.log('views path', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 커스텀 설정: "verbose errors"
// 템플릿에서 settings['verbose errors']로 접근 가능
app.enable('verbose errors');

// production 환경에서는 verbose errors 비활성화
// 실행: $ NODE_ENV=production node examples/error-pages
if (app.settings.env === 'production') app.disable('verbose errors');

silent || app.use(logger('dev'));

// Routes

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/404', function (req, res, next) {
  // 이후 어떤 미들웨어도 /404를 처리하지 않으므로 404 처리로 이동
  next();
});

app.get('/403', function (req, res, next) {
  // 403 에러 강제 발생
  var err = new Error('Not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function (req, res, next) {
  // 일반적인 500 에러 발생
  next(new Error('keyboard cat!'));
});

// 에러 핸들러

// 마지막까지 도달했지만 응답이 없으면 404 처리

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"
app.use(function (req, res, next) {
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url });
    },
    json: function () {
      res.json({ error: 'Not found' });
    },
    default: function () {
      res.type('txt').send('Not found');
    },
  });
});

// 에러 핸들링 미들웨어는 인자가 4개 (err, req, res, next)
// 일반 미들웨어와 동일하지만 에러가 발생했을 때만 호출됨
// 에러가 존재하면 일반 미들웨어는 건너뛰고 이 미들웨어로 이동
// 여기서는 단순히 에러 페이지를 렌더링함
app.use(function (err, req, res, next) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
