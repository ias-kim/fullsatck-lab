// 버블정렬 함수
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));

let startTime = new Date().getTime();
bubbleSort(arr);
let endTime = new Date().getTime();

// 시간차 출력
console.log('선택 저열 소요 시간', endTime - startTime, 'Ms.');

// 이미 정렬된 배열에 대한 선택 정렬의 수행 시간 측정
arr = Array.from({ length: 3000 }, () => 7);

// getTime()
startTime = new Date().getTime();
bubbleSort(arr);
endTime = new Date().getTime();

// 시간차 출력
console.log(
  '정렬된 배열에 대한 선택 정렬 소요 시간:',
  endTime - startTime,
  'MS',
);
