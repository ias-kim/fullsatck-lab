let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 모든 수열을 계산한다.
// 모든 순열의 수를 고려하기 위해 재귀 함수를 사용가능
// 하나의 순열을 트리에서 리프 노드까지의 경로로 생각 가능 -> M개의 원소를 뽑는 순열을 고려하는 것, 깊이는 M과 같음
// 원소를 중복하여 선택하지 않으므로, 방문 처리 배열을 사용 -> 한 번 선택된 원소는 다음 재귀 함수에서 다시 선택 X

let [n, m] = input[0].split(' ').map(Number); // 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
let arr = []; // 순열을 계산하고자 하는 원소가 담긴 배열
for (let i = 1; i <= n; i++) arr.push(i);
let visited = new Array(n).fill(false); // 각 원소 인덱스별 방문 여부
let selected = []; // 현재 순열에 포함된 원소

let answer = '';

function dfs(arr, depth) {
  if (depth === m) {
    // 모든 순열을 확인하는 부분
    let result = []; // 순열 결과 저장 테이블
    for (let i of selected) result.push(arr[i]);
    for (let x of result) answer += x + ' '; // 계산된 순열을 실질적으로 처리하는 부분
    answer += '\n';
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue;
    selected.push(i);
    visited[i] = true;
    dfs(arr, depth + 1);
    selected.pop();
    visited[i] = false; //
  }
}

dfs(arr, 0);
console.log(answer);
