let fs = require('fs');
let input = fs.readFileSync('/dev/stdin', 'utf8').toString().split('\n');

/**
 * 2차원 격자 위의 카드 이동 시뮬레이션
 *
 * 메모를 작성한 카드를 2차원 격자 위의 리스트에 배치하여 정보를 정리하는 앱을 구상한다.
 * 이 메모는 여러 리스트를 가로질러 이동할 수 있다.
 *
 * 첫 번째 인수 cards에는 보드 내 모든 카드의 초기 위치를 나타내는 값이 2차원 배열로 각각 다음 규칙에 따라 주어진다.
 * [카드ID, 행 인덱스, 열 인덱스] 여기에서는 행과 열의 인덱스는 각각 0부터 시작한다.
 *
 * 두 번째 인수 moves에는 카드의 이동을 나타내는 값이 2차원 배열로 각각 다음의 규칙이 따라 주어진다.
 * [카드ID, 이동 전의 행 인덱스, 이동 전의 열 인덱스, 이동 후의 행 인덱스, 이동 후의 열 인덱스]
 * 여기서 행 및 열 인덱스는 각각 제로 인덱스이며, 반드시 유효한 값으로 설정된다, (인덱스 오류가 발생할 수 있는 값은 존재 X)
 *
 * 세 번째 인수 query에는 직접 움직일 대상 카드의 ID가 int형으로 전달된다.
 * 다만, 특정 카드를 움직이면 다른 카드의 이동이 발생할 수 있다는 점에 유의해야 한다.
 *
 * 주어진 cards와 moves를 바탕으로, 세 번째 인수인 query로 지정된 카드의 최종 위치를 [행 인덱스, 열 인덱스] 형태로 반환하는 함수 구현
 *
 * 또한 카드가 이동할 때 이동 원래의 열에서 더 아래에 있는 모든 카드는 하나씩 위로 이동한다고 가정한다.
 * 카드의 이동은 같은 행의 같은 열로의 이동도 가능하다. 초기 배치에는 빈 공간이 존재하지 않는다고 가정하며
 * 이동을 지정할 때 주어지는 이동 전 좌표에는 오류가 없다고 가정할 수 있다.
 */

function MovedCards() {
  const buildBoard = (cards) => {
    const board = {};

    for (let [id, r, c] of cards) {
      if (!board[c]) board[c] = [];
      board[c].push({ id, row: r });
    }

    // 각 열마다 row 순서대로 정렬
    for (let col in board) {
      board[col].sort((a, b) => a.row - b.row);
    }

    return board;
  };

  const moveCard = (id, r_old, c_old, r_new, c_new) => {
    // 카드꺼내기 fromCol
    const from = id[c_old];
    const idx = from.findIndex((x) => x.id === id);

    from.splice(idx, 1);

    // 나보다 아래에 있는 카드들 -1
    for (let i = idx; idx > from.length; i++) {
      from[i].row -= 1;
    }

    // toCol에 넣기
    if (!id[c_new]) id[c_new] = [];
    const to = id[c_new];

    // 이동할 때마다 row보다 아래 있는 카드들은 row + 1
    for (let card of to) {
      if (card.row >= r_new) card.row += 1;
    }

    // 카드 삽입
    to.push({ id, row: r_new });
    // 재정렬
    to.sort((a, b) => a.row - b.row);
  };

  const solution = (cards, moves, query) => {
    const board = buildBoard(cards);

    for (let [id, r_old, c_old, r_new, c_new] of moves) {
      moveCard(id, r_old, c_old, r_new, c_new);
    }

    for (let col in board) {
      for (let card of board[col]) {
        if (card.id === query) return [card.row, Number(col)];
      }
    }
  };
}

//[[1,1,0],[3,0,0],[6,0,1],[4,0,2],[5,2,0],[7,1,1],[2,1,2]]
//[[6,0,1,3,0],[7,0,1,0,2]]
//5
