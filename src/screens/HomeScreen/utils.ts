export const EMPTY = null;
export const HUMAN_PLAYER = 'X';
export const AI_PLAYER = 'O';
export type Grid = Array<Array<{ id: number; value: null | 'X' | 'O' }>>;

export const findBestMove = (board: Grid) => {
  let bestVal = -Infinity;
  let bestMove = -1;
  const flatBoard = board.flat();

  for (let i = 0; i < 9; i += 1) {
    if (flatBoard[i].value === EMPTY) {
      flatBoard[i].value = AI_PLAYER;
      const moveVal = minimax(flatBoard, 0, false);
      flatBoard[i].value = EMPTY;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};

export const isBoardFull = (
  board: {
    id: number;
    value: null | 'X' | 'O';
  }[],
) => {
  return board.every((cell) => cell.value !== EMPTY);
};

export const minimax = (
  newBoard: {
    id: number;
    value: null | 'X' | 'O';
  }[],
  depth: number,
  isMaximizing: boolean,
): number => {
  const score = evaluate(newBoard);
  if (score !== 0) return score - depth;
  if (isBoardFull(newBoard)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i += 1) {
      if (newBoard[i].value === EMPTY) {
        // eslint-disable-next-line no-param-reassign
        newBoard[i].value = AI_PLAYER;
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        // eslint-disable-next-line no-param-reassign
        newBoard[i].value = EMPTY;
      }
    }
    return best;
  }
  let best = +Infinity;
  for (let i = 0; i < 9; i += 1) {
    if (newBoard[i].value === EMPTY) {
      // eslint-disable-next-line no-param-reassign
      newBoard[i].value = HUMAN_PLAYER;
      best = Math.min(best, minimax(newBoard, depth + 1, true));
      // eslint-disable-next-line no-param-reassign
      newBoard[i].value = EMPTY;
    }
  }
  return best;
};

export const checkWinner = (
  board: {
    id: number;
    value: null | 'X' | 'O';
  }[],
  player: string,
) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index].value === player),
  );
};

export const evaluate = (
  b: {
    id: number;
    value: null | 'X' | 'O';
  }[],
) => {
  if (checkWinner(b, AI_PLAYER)) return +10;
  if (checkWinner(b, HUMAN_PLAYER)) return -10;
  return 0;
};

export const computeBoxBorder = (rowIndex: number, boxIndex: number) => {
  const isTop = rowIndex === 0;
  const isBottom = rowIndex === 2;
  const isLeft = boxIndex === 0;
  const isRight = boxIndex === 2;
  return {
    borderTopWidth: isTop ? 0 : 3,
    borderBottomWidth: isBottom ? 0 : 3,
    borderLeftWidth: isLeft ? 0 : 3,
    borderRightWidth: isRight ? 0 : 3,
    borderTopLeftRadius: isTop && isLeft ? 10 : 0,
    borderTopRightRadius: isTop && isRight ? 10 : 0,
    borderBottomLeftRadius: isBottom && isLeft ? 10 : 0,
    borderBottomRightRadius: isBottom && isRight ? 10 : 0,
  };
};
