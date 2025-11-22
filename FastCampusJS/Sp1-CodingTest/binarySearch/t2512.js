let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 예산 지정받을 지방 N
let n = input[0].split(' ')[0];
// 각 지방의 예상 점유율
let arr = input[1].split(' ').map(Number);
// 상한치 예산
let m = input[2].split(' ')[1];

let start = 1;
let end = arr.reduce((a, b) => Math.max(a, b)); // 정렬
let result = 0;

// 반복문 계속
while (start <= end) {
  let mid = parseInt((start + end) / 2);
  let total = 0;

  for (let x of arr) {
    total += Math.min(mid, x);
  }
  if (mid <= m) {
    result = mid;
    end = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(result);
