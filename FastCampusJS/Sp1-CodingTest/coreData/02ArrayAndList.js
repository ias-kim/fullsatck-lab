let arr = [1, 2, 3, 4, 5];
console.log(arr);

let arr2 = Array.from({ length: 5 }, () => 7);
console.log(arr2);

let arr3 = Array.from(Array(4), () => new Array(5));
console.log(arr3);

let arr4 = new Array(3);
for (let i = 0; i < arr4.length; i++) {
  arr4[i] = Array.from({ length: 4 }, (undefined, j) => i * 4 + j);
}
console.log(arr4);

let arr5 = [1, 2, 3, 4, 5];
let result = arr5.slice(2, 4);
console.log(result);

let arr6 = [7, 3, 5, 6, 6, 2, 1];
console.log(arr6.indexOf(5));
console.log(arr6.indexOf(6));
console.log(arr6.indexOf(8));
