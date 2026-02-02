/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    arr.push(s[i]);
  }
  let stack = [];

  for (const a of arr) {
    if (a === '(' || a === '{' || a === '[') {
      stack.push(a);
    } else if (a === ')') {
      if (stack.length === 0 || stack.pop() !== '(') {
        return false;
      }
    } else if (a === '}') {
      if (stack.length === 0 || stack.pop() !== '{') {
        return false;
      }
    } else if (a === ']') {
      if (stack.length === 0 || stack.pop() !== '[') {
        return false;
      }
    } else {
      return false;
    }
    return stack.length === 0;
  }
};
