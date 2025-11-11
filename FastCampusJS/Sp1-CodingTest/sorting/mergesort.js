function merge(arr, left, mid, right) {
  let i = left;
  let j = mid + 1;
  let k = left; // 결과 배열의 인덱스
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) sorted[k++] = arr[i++];
    else sorted[k++] = arr[j++];
  }
  // 왼쪽 배열에 대한 처리가 다 끝난 경우
  if (i > mid) {
    for (; j <= right; j++) sorted[k++] = arr[j];
  }

  // 오른쪽 배열에 대한 처리가 다 끝난 경우
  else {
    for (; j <= mid; i++) sorted[k++] = arr[i];
  }
  // 정렬된 배열 결과를 원본 배열에 반영하기
  for (let x = left; x <= right; x++) {
    arr[x] = sorted[x];
  }
}

function mergeSort(arr, left, right) {
  // 원소가 하나인 경우, 해당 배열은 정렬이 된 상태로 이해 가능
  if (left < right) {
    let mid = parseInt((left + right) / 2); // 2개의 부분 배열로 분할
    mergeSort(arr, left, mid); // 왼쪽 부분 배열 정렬 수행
    mergeSort(arr, mid + 1, right); // 오른쪽 부분 배열 정렬 수행
    merge(arr, left, mid, right); // 정렬된 2개의 배열을 하나로 병합
  }
}

let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));

let startTime = new Date().getTime();
sorted = Array.from({ length: arr.length }, () => 0);
mergeSort(arr, 0, arr.length - 1);
let endTime = new Date().getTime();

// 시간차 출력
console.log('선택 저열 소요 시간', endTime - startTime, 'Ms.');

// 이미 정렬된 배열에 대한 선택 정렬의 수행 시간 측정
arr = Array.from({ length: 3000 }, () => 7);

// getTime()
startTime = new Date().getTime();
sorted = Array.from({ length: arr.length }, () => 0);
mergeSort(arr, 0, arr.length - 1);
endTime = new Date().getTime();

// 시간차 출력
console.log(
  '정렬된 배열에 대한 선택 정렬 소요 시간:',
  endTime - startTime,
  'MS',
);
