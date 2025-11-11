let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let number = Number(input[0]);

for (let i = 1; i <= number; i++) {
  let data = input[i].split(' ').map(Number);
  let n = data[0];
  let sum = 0;

  // 평균 계산
  for (let j = 1; j <= n; j++) {
    sum += data[j];
  }

  let average = sum / n;
  let cnt = 0;

  // 평균 넘는 학생 수 계산
  for (let j = 1; j <= n; j++) {
    if (data[j] > average) cnt++;
  }

  // 비율 출력
  console.log(`${((cnt / n) * 100).toFixed(3)}%`);
}
