let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let hour = Number(input[0].split(' ')[0]);
let minute = Number(input[0].split(' ')[1]);
let plus = Number(input[1]);

let n = hour * 60 + minute + plus;
n %= 1440;
hour = parseInt(n / 60);
minute = n % 60;

console.log(hour + ' ' + minute);
