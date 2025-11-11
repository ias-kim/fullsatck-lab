function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i; // 가장 작은 원소의 인덱스
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    let temp = arr[minIndex];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}

let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));

let startTime = new Date().getTime();
selectionSort(arr);
let endTime = new Date().getTime();

// 시간차 출력
console.log('선택 저열 소요 시간', endTime - startTime, 'Ms.');

// 이미 정렬된 배열에 대한 선택 정렬의 수행 시간 측정
arr = Array.from({ length: 3000 }, () => 7);

// getTime()
startTime = new Date().getTime();
selectionSort(arr);
endTime = new Date().getTime();

// 시간차 출력
console.log(
  '정렬된 배열에 대한 선택 정렬 소요 시간:',
  endTime - startTime,
  'MS',
);
