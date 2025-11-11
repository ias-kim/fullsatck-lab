let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let max = -1;
let count = 0;

for (let i = 0; i < 9; i++) {
  let data = Number(input[i]);
  if (max < data) {
    max = data;
    count = i;
  }
}

console.log(max);
console.log(count + 1);
