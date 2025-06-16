/**
 * 원시 타입
 * Number, String, Boolean, null, undefined
 *
 * any, void, never
 * any : 어떤 값이든 들어올 수 있음
 * void : 값이 없음
 */

const num1: number = 100;
const num2 = 100;

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(num1, num2));

function printLog(msg: String): void {
  console.log(msg);
}

const returnValue = printLog('print');
console.log('return Value: ', returnValue);

function throwError(): never {
  throw new Error('err');
  console.log('err');
}

function infiniteLoop(): never {
  while (true) {
    // loop
  }
}

function validCheck(arg: never) {
  // const neverValue: never = null;
}

enum Color {
  Red,
  Green,
  Blue,
}

function selectColor(color: Color) {
  switch (color) {
    case Color.Red:
      break;
    case Color.Blue:
      break;
    case Color.Green:
      break;
    default:
      validCheck(color); // 들어 갈 수 없어야함.
  }
}

/**
 * Object, Array
 *
 * Tuple : 고정된 배열인데 인덱스마다 타입이 다를때
 */

const obj: object = { name: 'John' };
const arr: Array<number> = [0, 1, 2];
const obj2: {} = { name: 'John' };
const arr2: number[] = [0, 1, 2];

const tupl: [number, string, string, number] = [0, '1', '2', 3];

// enum : 열거형
enum Type {
  User = 'user', // 0 = 명시적으로 선언도 가능
  Admin = 'admin', // 1
}

console.log('type enum', Type.User, Type.Admin);
