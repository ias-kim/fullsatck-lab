let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 문제 solution 함수에 () {} []로 구성된 문자열 s가 인수로 주어진다.
// 괄호로 구성된 s의 형태가 올바른지 여부를 solution 함수의 반환 값으로 bool 형식으로 반환하는 프로그램 작성.

const solution = (s) => {
  // 검증에 필요한 배열
  const stack = [];

  // 여는괄호 닫는괄호 쌍으로 존재
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  // 반복문을 통한 문자열 검증
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      // 닫는 스택인데 비어있으면 잘못되었음
      if (stack.length === 0) return false;

      // 닫는 스택이 잘못되면 틀림!
      if (stack.pop() !== pairs[char]) return false;
    }

    return stack.length === 0;
  }
};
