let arr = [1, 8, 5, 9, 21, 3, 7, 2, 15];

function compare(a, b) {
  if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
}

arr.sort(compare);
console.log(arr);

// 내림 차순
function comare1(a, b) {
  return b - a;
}

// 한 줄 코드
arr.sort(function (a, b) {
  return a - b;
});

// 문자열 예시
let arr = ['fineapple', 'banana', 'durian', 'apple', 'carrot'];

arr.sort();
console.log(arr);

// 내림 차순
function comare2(a, b) {
  if (a > b) return -1;
  else if (a < b) return 1;
  else return 0;
}

arr.sort(comare2);
console.log(arr);

// 대소문자 구문 없이
function comare3(a, b) {
  let upperCaseA = a.toUpperCase();
  let upperCaseB = b.toUpperCase();
  if (upperCaseA > upperCaseB) return -1;
  else if (upperCaseA < upperCaseB) return 1;
  else return 0;
}

arr.sort(comare3);
console.log(arr);

// 객체 오름차순
let arr = [
  { name: '홍길동', score: 90 },
  { name: '홍길동', score: 94 },
  { name: '홍길동', score: 77 },
];

function comare4(a, b) {
  return b.score - a.score;
}

arr.sort(comare4);
console.log(arr);
