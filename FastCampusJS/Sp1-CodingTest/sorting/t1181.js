let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let n = Number(input[0]);
let arr = [];

for (let i = 1; i <= n; i++) {
  arr.push(input[i]);
}

// 중복된 원소를 제거하기 위해 집합으로 변환한 뒤에 배열로 돌리기
arr = [...new Set(arr)];

arr.sort((a, b) => {
  // 길이가 짧으면 길이가 짧은 것이 우선
  if (a.length !== b.length) {
    return a.length - b.length;
  } else {
    // 길이가 같으면
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  }
});

for (let item of arr) {
  console.log(item);
}
