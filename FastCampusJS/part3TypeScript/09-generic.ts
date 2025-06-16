function identity<T>(arg: T): T {
  return arg;
}

interface GenericInterface<T> {
  (arg: T): T;
}

const output1 = identity<string>('string'); // 제러릭 함수 실행순간에 타입 지정

const output2 = identity<number>(100);

const myIdentity: GenericInterface<number> = identity;

class GenericNumber<T> {
  value: T;
  add: (num1: T, num2: T) => T;
}

const genericClass = new GenericNumber<number>();
genericClass.value;
genericClass.add;
