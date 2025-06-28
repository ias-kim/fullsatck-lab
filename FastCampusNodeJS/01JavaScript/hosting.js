// 함수 호이스팅
funct();

function funct() {
  console.log('3');
}

console.log(greeting);
// TDZ(Temporal Dead Zone) 발생
const greeting = 'Hello World';
