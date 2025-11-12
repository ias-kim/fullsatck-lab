let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = Number(input[0]);
let current = 0;
let sum = 0;

while (sum <= n) {
  current += 1;
  sum += current;
}

console.log(current - 1);
