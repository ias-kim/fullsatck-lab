let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 나무의 수 N
let n = input[0].split(' ')[0];
// 나무의 길이 M
let m = input[0].split(' ')[1];

let arr = input[1].split(' ').map(Number);

// 정렬
let start = 0;
let final = arr.reduce((a, b) => Math.max(a, b));

let result = 0;
while (start <= final) {
  // 중간점 계산
  let mid = parseInt((final + start) / 2); // 현재의 중간점
  let total = 0; // mid로 잘랐을 때 얻을 수 있는 나무의 양 계산

  for (let x of arr) {
    if (x > mid) total += x - mid;
  }
  if (total < m) {
    final = mid - 1;
  } else {
    result = mid; // 최대한 덜 잘랐을 떄가 정답
    start = mid + 1;
  }
}
console.log(result);
