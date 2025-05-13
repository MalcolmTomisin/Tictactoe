import {
  HUMAN_PLAYER,
  findBestMove,
  isBoardFull,
  minimax,
  checkWinner,
  evaluate,
  computeBoxBorder,
  FlattenedGrid,
} from './utils';

describe('utils', () => {
  describe('isBoardFull', () => {
    it('returns true when the board is full', () => {
      const board = Array(9).fill({
        id: 0,
        value: 'X',
      }) as FlattenedGrid;
      expect(isBoardFull(board)).toBe(true);
    });

    it('returns false when the board is not full', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'X' },
        { id: 1, value: null },
        { id: 2, value: 'O' },
      ];
      expect(isBoardFull(board)).toBe(false);
    });
  });

  describe('checkWinner', () => {
    it('returns true when a player has a winning pattern', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'X' },
        { id: 1, value: 'X' },
        { id: 2, value: 'X' },
        { id: 3, value: null },
        { id: 4, value: null },
        { id: 5, value: null },
        { id: 6, value: null },
        { id: 7, value: null },
        { id: 8, value: null },
      ];
      expect(checkWinner(board, HUMAN_PLAYER)).toBe(true);
    });

    it('returns false when there is no winner', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'X' },
        { id: 1, value: 'O' },
        { id: 2, value: 'O' },
        { id: 3, value: 'O' },
        { id: 4, value: 'X' },
        { id: 5, value: 'O' },
        { id: 6, value: 'X' },
        { id: 7, value: 'O' },
        { id: 8, value: 'O' },
      ];
      expect(checkWinner(board, HUMAN_PLAYER)).toBe(false);
    });
  });

  describe('evaluate', () => {
    it('returns +10 when AI_PLAYER wins', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'O' },
        { id: 1, value: 'O' },
        { id: 2, value: 'O' },
        { id: 3, value: null },
        { id: 4, value: null },
        { id: 5, value: null },
        { id: 6, value: null },
        { id: 7, value: null },
        { id: 8, value: null },
      ];
      expect(evaluate(board)).toBe(10);
    });

    it('returns -10 when HUMAN_PLAYER wins', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'X' },
        { id: 1, value: 'X' },
        { id: 2, value: 'X' },
        { id: 3, value: null },
        { id: 4, value: null },
        { id: 5, value: null },
        { id: 6, value: null },
        { id: 7, value: null },
        { id: 8, value: null },
      ];
      expect(evaluate(board)).toBe(-10);
    });

    it('returns 0 when there is no winner', () => {
      const board = Array(9).fill({ id: 0, value: null }) as FlattenedGrid;
      expect(evaluate(board)).toBe(0);
    });
  });

  describe('findBestMove', () => {
    it('returns the best move for AI_PLAYER', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'X' },
        { id: 1, value: 'O' },
        { id: 2, value: 'X' },
        { id: 3, value: 'X' },
        { id: 4, value: 'O' },
        { id: 5, value: null },
        { id: 6, value: null },
        { id: 7, value: null },
        { id: 8, value: null },
      ];
      const bestMove = findBestMove([
        board.slice(0, 3),
        board.slice(3, 6),
        board.slice(6, 9),
      ]);
      expect(bestMove).toBe(7);
    });
  });

  describe('minimax', () => {
    it('returns the best score for maximizing player', () => {
      const board: FlattenedGrid = [
        { id: 0, value: 'X' },
        { id: 1, value: 'O' },
        { id: 2, value: 'X' },
        { id: 3, value: null },
        { id: 4, value: 'O' },
        { id: 5, value: null },
        { id: 6, value: null },
        { id: 7, value: null },
        { id: 8, value: null },
      ];
      const score = minimax(board, 0, true);
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('computeBoxBorder', () => {
    it('returns correct border styles for top-left box', () => {
      const border = computeBoxBorder(0, 0);
      expect(border).toEqual({
        borderTopWidth: 0,
        borderBottomWidth: 3,
        borderLeftWidth: 0,
        borderRightWidth: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      });
    });

    it('returns correct border styles for bottom-right box', () => {
      const border = computeBoxBorder(2, 2);
      expect(border).toEqual({
        borderTopWidth: 3,
        borderBottomWidth: 0,
        borderLeftWidth: 3,
        borderRightWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 10,
      });
    });
  });
});
