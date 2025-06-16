function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number[], b: number[]): number[];
function add(a: any, b: any): any {
  //
  return a + b;
}

add(1, 2);
add('1', '2');
add([1], [2]);
