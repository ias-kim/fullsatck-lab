let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 정렬된 순서를 유지하면서 배열에 삽입할 가장 왼쪽 인덱스
function lowerBound(arr, target, start, end) {
  while (start < end) {
    let mid = parseInt((start + end) / 2);
    if (arr[mid] >= target) end = mid;
    else start = mid + 1;
  }
  return end;
}

// 병사의 진열 수
let n = Number(input[0]);
let arr = input[1].split(' ').map(Number);

// 순서를 뒤집어서 최장 증가 부분 수열 (LTS) 문제로 변환
arr.reverse();

let d = [0]; // LTS 배열
// 이진 탐색을 활용한 LTS 알고리즘 수행
for (x of arr) {
  if (d[d.length - 1] < x) {
    // 마지막 원소보다 현재 원소 X가 크다면 가장 뒤에 넣기
    d.push(x);
  } else {
    // x 이하인 원소가 있다면, 가능한 왼쪽에 있는 원소와 x를 교체
    let index = lowerBound(d, x, 0, d.length);
    d[index] = x;
  }
}

// 열외해야하는 병사의 최소 수를 출력
console.log(n - (d.length - 1));
