const data: readonly number[] = [100];

interface Size {
  readonly width: number;
  readonly height: number;
}

const size: Size = { width: 1280, height: 720 };

// size.width = 123;

class ClassA {
  readonly id = '1234';
}

const classA = new ClassA();
// classA.id = '123';

// ReadOnly<T>
interface RotateData {
  angle: number;
}

const immutableRotateData: Readonly<RotateData> = Object.freeze({ angle: 180 });
console.log(immutableRotateData);
// immutableRotateData.angle = 90;
