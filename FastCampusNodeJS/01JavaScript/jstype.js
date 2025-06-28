let foo = 42;
foo = 'bar';
foo = true;

console.log(typeof foo);

// 원시 타입
// String
const name = 'han';
// Number
const age = 30;
// Boolean
const hasJob = false;
// null
const car = null;
// undefined
let anything;
// Symbol
const sym = Symbol();

// 참조 타입
// Array
const hobbies = ['walking', 'books'];
// Objects
const address = {
  province: '경기도',
  city: '성남시',
};
console.log(typeof hobbies);
console.log(Array.isArray(address));
