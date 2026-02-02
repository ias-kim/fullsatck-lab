/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 트리 순회(재귀)
// preorder : self left right
// inorder : left self right
// postorder : left right self
// 이진검색트리 성질 -> inorder -> 오름차순 정렬이 됨
let getMinimumDifference = function (root) {
  let min = Infinity;
  let prev = null;

  // 클로저 함수를 이용해 재귀함수
  function inorder(root) {
    if (root === null) return;
    inorder(root.left); // 왼쪽

    // self 처리
    if (prev !== null) {
      min = Math.min(min, root.val - prev);
    }
    prev = root.val;

    inorder(root.right); // 오른쪽
  }

  inorder(root);
  return min;
};
