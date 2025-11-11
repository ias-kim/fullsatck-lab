let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let arr = new Set();

for (let j = 0; j < 10; j++) {
  let data = Number(input[j]);
  let result = data % 42;
  arr.add(result);
}

console.log(arr.size);
