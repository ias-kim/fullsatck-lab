let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let n = Number(input[0]);
let arr = input[1].split(' ').map(Number);

let min = -100001;
let max = 100001;

for (let i = 0; n > i; ++i) {
  if (min > arr[i]) min = arr[i];
  if (max < arr[i]) max = arr[i];
}
console.log(min, max);
