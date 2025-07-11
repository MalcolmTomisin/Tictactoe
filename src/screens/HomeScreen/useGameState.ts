/* eslint-disable import/prefer-default-export */
import { useState, useCallback } from 'react';
import { Grid } from './utils';

export const useGameState = (initialPlayer: 'X' | 'O') => {
  const [boxes, setBoxes] = useState<Grid>(
    new Array(3)
      .fill(0)
      .map((m, v) =>
        Array.from({ length: 3 }, (_, i) => ({ id: 3 * v + i, value: null })),
      ),
  );

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(initialPlayer);

  const resetGame = useCallback(() => {
    setBoxes(
      new Array(3)
        .fill(0)
        .map((m, v) =>
          Array.from({ length: 3 }, (_, i) => ({ id: 3 * v + i, value: null })),
        ),
    );
    setCurrentPlayer(initialPlayer);
  }, [initialPlayer]);

  return {
    boxes,
    setBoxes,
    currentPlayer,
    setCurrentPlayer,
    resetGame,
    flattenedBoxes: boxes.flat(),
  };
};