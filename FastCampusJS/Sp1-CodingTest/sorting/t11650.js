let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let n = Number(input[0]);
let arr = [];
for (let i = 1; i <= n; i++) {
  let [x, y] = input[i].split(' ').map(Number);
  arr.push([x, y]);
}

function compare(a, b) {
  if (a[1] !== b[1])
    return a[1] - b[1]; // x 좌표 기준 오름차순
  else return a[0] - b[0]; // x 가 같으면 y 좌표 기준 오름차순
}

arr.sort(compare); // 정렬 수행

let answer = '';
for (let point of arr) {
  answer += point[0] + ' ' + point[1] + '\n';
}
console.log(answer);
