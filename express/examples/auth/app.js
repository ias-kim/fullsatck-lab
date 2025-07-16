'use strict';

// 모듈 의존성

var express = require('express');
var hash = require('pbkdf2-password')();
var path = require('node:path');
var session = require('express-session');

var app = (module.exports = express());

// 설정

app.set('views engine', 'ejs'); // 텦플릿 엔진 설정
app.set('views', path.join(__dirname, 'views')); // 뷰 파일 디렉토리 설정

// 미들웨어

app.use(express.urlencoded()); // 폼 데이터 파싱
app.use(
  session({
    resave: false, // 수정되지 않은 세션은 저장하지 않음
    saveUninitialized: false, // 저장할 데이터가 없으면 세션 생성하지 않음
    secret: 'shhhh, very secret', // 세션 암호화 키
  }),
);

// 세션에 저장된 메시지를 보여주는 미들웨어

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// 더미 사용자 데이터베이스

var users = {
  tj: { name: 'tj' },
};

// 사용자 생성 시 salt와 해시된 비밀번호를 저장
// 여기선 'foobar'가 비밀번호

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // salt와 hash를 db에 저장
  users.tj.salt = salt;
  users.tj.hash = hash;
});

// 사용자 인증 함수 - 임시 객체 db 사용

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // 주어진 사용자명으로 사용자 찾기
  if (!user) return fn(null, null);
  // 동일한 알고리즘으로 전달받은 비밀번호와 salt를 이용해 검증
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user);
    fn(null, null);
  });
}

// 로그인하지 않은 사용자를 제한하는 미들웨어
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/restricted', restrict, function (req, res) {
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function (req, res) {
  // 사용자의 세션을 삭제하여 로그아웃 처리
  // 다음 요청 시 새로 생성됨
  req.session.destroy(function () {
    res.redirect('/login');
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', authenticate, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) return next(err);
    if (user) {
      // 로그인 시 세션을 재성성하여
      // 세션 고정 공격 방지
      req.session.regenerate(function () {
        // 세션에 사용자 정보를 저장
        req.session.user = user;
        req.session.success =
          'Authenticated as ' +
          user.name +
          ' click to <a href="/logout">logout</a>. ' +
          ' Yout may now access <a href="restricted">/restricted</a>. ';
        res.redirect(req.get('Referrer') || '/');
      });
    } else {
      req.session.error =
        'Authentication failed, please check your ' +
        ' username and password.' +
        ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
