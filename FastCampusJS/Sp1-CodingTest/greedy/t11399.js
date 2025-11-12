let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = Number(input[0]);

let x = input[1].split(' ').map(Number);

x.sort((a, b) => a - b);

let answer = 0;
let summary = 0;
for (let i = 0; i < n; i++) {
  summary += x[i]; // i 번째 사람이 기다린 총 시간
  answer += summary; // 지금까지 소요된 총 시간
}

console.log(answer);
