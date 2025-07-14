'use strict';

/**
 * 모듈 의존성
 */

var express = require('express');
var GithubView = require('./github-view');
var md = require('marked').parse;

var app = (module.exports = express());

// .md 확장자를 express 뷰 엔진으로 등록
app.engine('md', function (str, options, fn) {
  try {
    var html = md(str); // 마크다운을 html로 파싱
    html = html.replace(/\{([^}]+)\}/g, function (_, name) {
      return options[name] || ''; // 변수명 치환 처리
    });
    fn(null, html); // 렌더링 성공 시 html 반환
  } catch (err) {
    fn(err); // 에러 발생 시 콜백 호출
  }
});

// 특정 깃허브 저장소를 참조하도록 설정 (파일을 이곳에서 불러옴)
app.set('view', 'Theunkillabledemonking/Theunkillabledemonking');
app.set('views', 'main');
// 새로운 뷰 생성자 등록
app.set('view', GithubView);

app.get('/', function (req, res) {
  // 깃허브 레포를 기준으로 상대 경로의 마크다운 뷰 렌더링
  // app.locals, res.locals, 그리고 직접 전달한 locals 모두 사용 가능
  res.render('README.md', { title: 'Example' });
});

app.get('/Readme.md', function (req, res) {
  res.render('README.md');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Server started on port 3000');
}
