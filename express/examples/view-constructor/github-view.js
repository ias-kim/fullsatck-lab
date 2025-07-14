'use strict';

// 모듈 의존성

var https = require('node:https');
var path = require('path');
var extname = path.extname;

// 깃허브뷰를 외부에 노출

module.exports = GithubView;

/**
 * github의 원격 템플릿을 가져와서 렌더링하는
 * 사용자 정의 뷰(view) 생성자.
 * 이 구조는 Github에서 마크다운 같은 파일을 가져오는 용도로 쓰이지만,
 * DB에서 템플릿을 가져오는 식으로도 확장 가능함
 */

function GithubView(name, options) {
  this.name = name;
  options = options || {};
  const ext = extname(name);
  this.engine =
    options.engines?.[ext] || require('express').application.engines[ext];
  // 'root'는 app.set('views')에 설정한 값
  // 필요하다면 무시하고 다른 경로를 지정할 수도 있음.
  const root = options.root || 'expressjs/express';
  this.path = '/Theunkillabledemonking/Theunkillabledemonking/main/' + name;
}

/**
 * 뷰 렌더링 메서드
 */
GithubView.prototype.render = function (options, fn) {
  var self = this;

  // github의 raw 파일 주소로 요청을 보낼 옵션 설정
  var opt = {
    host: 'raw.githubusercontent.com',
    port: 443,
    path: this.path,
    method: 'GET',
  };

  // https GET 요청 실행
  https
    .request(opt, function (res) {
      console.log('[Github]', res.statusCode);
      var buf = '';
      res.setEncoding('utf8');

      // 응답 데이터를 버퍼에 누적
      res.on('data', function (str) {
        buf += str;
      });

      // 데이터 수신 완료 시 뷰 엔진을 이용해 렌더링 수집
      res.on('end', function () {
        self.engine(buf, options, fn);
      });
    })
    .end();
};
