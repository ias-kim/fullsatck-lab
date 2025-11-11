let fs = require('fs');

let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// trim 메서드로 양 끝의 공백을 제거
let data = input[0].trim().split(' ');

if (data === '') {
  console.log('');
} else {
  console.log(data.length);
}
