let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = Number(input[0]);
let cnt = 0;
let flag = false;

while (n >= 0) {
  // n이 0, n로 나누어 떨어지는 값인 경우
  if (n === 0 || n % 5 === 0) {
    cnt += parseInt(n / 5); // 5로 나눈몫 더하기
    console.log(cnt);
    flag = true;
    break;
  }
  n -= 3;
  cnt += 1;
}
if (!flag) {
  console.log(-1);
}
