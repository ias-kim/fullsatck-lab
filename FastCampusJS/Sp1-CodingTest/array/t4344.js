let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let number = Number(input[0]);

for (let i = 0; i < number; i++) {
  let data = input[i].split(' ').map(Number);
  let n = data[0];
  let summary = 0;
  for (let j = 0; j <= n; j++) {
    summary += data[j];
  }
  let average = summary / n;
  let cnt = 0;
  for (let j = 0; j <= n; j++) {
    if (data[j] > average) cnt += 1;
    console.log(`${((cnt / n) * 100).toFixed(3)}%`);
  }
}
