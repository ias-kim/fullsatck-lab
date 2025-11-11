function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      // 인덱스 j부터 1까지 1씩 감소하여 반복
      if (arr[j] < arr[j - 1]) {
        // 한 칸씩 왼쪽으로 이동
        // 스와프(swap)
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      } else {
        break;
      }
    }
  }
}

let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));

let startTime = new Date().getTime();
insertionSort(arr);
let endTime = new Date().getTime();

// 시간차 출력
console.log('선택 저열 소요 시간', endTime - startTime, 'Ms.');

// 이미 정렬된 배열에 대한 선택 정렬의 수행 시간 측정
arr = Array.from({ length: 3000 }, () => 7);

// getTime()
startTime = new Date().getTime();
insertionSort(arr);
endTime = new Date().getTime();

// 시간차 출력
console.log(
  '정렬된 배열에 대한 선택 정렬 소요 시간:',
  endTime - startTime,
  'MS',
);
