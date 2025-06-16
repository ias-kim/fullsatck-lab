type UnionType = string | number | Array<string | number>;

function printUnion(msg: UnionType): void {
  console.log(msg);
}

printUnion(1);
printUnion('text');
printUnion([1, 2, 3, 4]);
printUnion(['1', '2']);
printUnion([1, '2', 3, 4]);

type IntersectionType = Object & Array<number | string>;

function printIntersection(msg: IntersectionType): void {
  console.log(msg);
}

printIntersection([1]);
printIntersection(['1']);

type UnionType2 = { a: string } | { b: number };
type IntersectionType2 = { a: string } & { b: number };

function printUnion2(msg: UnionType2): void {
  console.log(msg);
}

function printIntersection2(msg: IntersectionType2): void {
  console.log(msg);
}

printUnion2({ a: 'a', b: 1 });
printIntersection2({ a: 'a', b: 2 });
