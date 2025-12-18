let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 1부터 N까지의 수를 오름차순 수열 [1,2,3, N]
// 다음과 같은 세 가지 연산
// 1. 더하기 2. 빼기 3. 숫자 이어 붙이기
// 결과적으로 N이 주어졌을 때, 수식의 결과가 0이 되는 모든 수식
// 테스트 케이스 및 자연수 N의 최댓값은 9
// 3개의 연산 중에서 연속적으로 N번 선택하는 중복 순열

let testCase = Number(input[0]);
let n = 0;

for (let i = 1; i <= testCase; i++) {
  // 각 테스트 케이스
  n = Number(input[i]);
  arr = [];
  for (let i = 1; i <= n; i++) arr.push(i); // 1부터 N까지 수 삽입
  dfs([], 0);
  console.log();
}

function dfs(result, depth) {
  if (n - 1 === depth) {
    // 현재 순열처리
    let str = ''; // 현재 수식 문자열
    for (let i = 0; i < n - 1; i++) str += arr[i] + result[i];
    str += arr[n - 1] + '';
    let current = eval(str.split(' ').join('')); // 공백을 제거한 뒤에 수식 계산
    if (current === 0) console.log(str); // 수식의 결과가 0이 되는 경우
    return;
  }
  for (let x of [' ', '+', '-']) {
    // 더하기(+), 빼기(-), 혹은 이어 붙이기 ()
    result.push(x);
    dfs(result, depth + 1); // 재귀 함수 호출
    result.pop();
  }
}
