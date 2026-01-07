let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// 문제 solution 함수에 () {} []로 구성된 문자열 s가 인수로 주어진다.
// 괄호로 구성된 s의 형태가 올바른지 여부를 solution 함수의 반환 값으로 bool 형식으로 반환하는 프로그램 작성.

const solution = (s) => {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (const ch of s) {
    // 여는 괄호 push
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(s);
    } else {
      // 닫는 괄호인데 stack이 비어있으면 잘못되었음.
      if (stack.length === 0) return false;
      // 스택이 top이 짝이 아니면 잘못됨
      if (stack.pop() !== pairs[ch]) return false;
    }
  }

  // 모든 괄호가 정상적으로 닫혔는지 확인.
  return stack.length === 0;
};
