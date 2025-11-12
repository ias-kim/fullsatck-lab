let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let n = Number(input[0]);
let arr = [];

for (let i = 0; i < n; i++) {
  let [x, y] = input[i].split(' ').map(Number);
  arr.push([x, y]);
}

function compare(a, b) {
  if (a[0] !== b[0]) return b[0] - a[0];
  else return a[1] - b[1];
}

arr.sort(compare);

let answer = '';

for (let item of arr) {
  answer += item[0] + ' ' + item[1] + '\n';
}
console.log(answer);
