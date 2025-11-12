let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = input[0].split(' ')[0];
let k = input[0].split(' ')[1];

let arr = [];
let cnt = 0;

// 전체 동전 (화폐 단위) 데이터 입력
for (let i = 1; i <= n; i++) {
  arr.push(input[i]);
}

for (let i = n - 1; i >= 0; i--) {
  cnt += parseInt(k / arr[i]);
  k %= arr[i];
}
console.log(cnt);
