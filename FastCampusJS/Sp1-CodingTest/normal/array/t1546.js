let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let number = Number(input[0]);
let scores = input[1].split(' ').map(Number);

let maxValue = scores.reduce((a, b) => Math.max(a, b));
let updated = [];

for (let i = 0; i < number; i++) {
  updated.push((scores[i] / maxValue) * 100);
}

console.log(updated.reduce((a, b) => a + b / number));
