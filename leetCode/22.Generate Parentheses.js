/**
 * @param {number} n
 * @return {string[]}
 */
// backtracking
// ~recursion+ termination check
let generateParenthesis = function (n) {
  let ret = [];
  process(n, 0, 0, '', ret);
  return ret;
};

// numClosed>numOpen -> invalid
function process(n, numOpen, numClosed, str, ret) {
  // termination check
  if (numOpen === n && numClosed === n) {
    ret.push(str);
    return;
  }
  // recurse next
  if (numOpen < n) {
    process(n, numOpen + 1, numClosed, str + '(', ret); // add open bracket
  }
  if (numOpen > numClosed) {
    process(n, numOpen, numClosed + 1, str + ')', ret); // add closed bracket
  }
}
