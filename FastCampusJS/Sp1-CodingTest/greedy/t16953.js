let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let [a, b] = input[0].split(' ').map(Number);
let flag = false;
let cnt = 1;

while (a <= b) {
  if (a == b) {
    flag = true;
    break;
  }
  if (b % 2 == 0)
    b = parseInt(b / 2); // 2로 나누어 떨어지는 경우
  else if (b % 10 == 1)
    b = parseInt(b / 10); // 그렇지도 않고 일의 자리수가 1인 경우
  else break; // 위 경우가 해당되지 않는 경우
  cnt++;
}

if (flag) {
  console.log(cnt);
} else {
  console.log(-1);
}
