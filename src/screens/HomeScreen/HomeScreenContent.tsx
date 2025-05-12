/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { Image } from 'expo-image';
import { RouteProp } from '@react-navigation/native';
import { RootScreenProps } from 'src/navigators/types';

const EMPTY = null;
const HUMAN_PLAYER = 'X';
const AI_PLAYER = 'O';

export default function HomeScreenContent({
  route,
}: {
  route: RouteProp<RootScreenProps, 'Home'>;
}) {
  const [boxes, setBoxes] = useState<
    Array<Array<{ id: number; value: null | 'X' | 'O' }>>
  >(
    new Array(3)
      .fill(0)
      .map(() => Array.from({ length: 3 }, (_, i) => ({ id: i, value: null }))),
  );

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(route.params.player);

  const isHumanTurn = currentPlayer === HUMAN_PLAYER;

  const evaluate = useCallback(
    (
      b: {
        id: number;
        value: null | 'X' | 'O';
      }[],
    ) => {
      if (checkWinner(b, AI_PLAYER)) return +10;
      if (checkWinner(b, HUMAN_PLAYER)) return -10;
      return 0;
    },
    [],
  );

  const minimax = useCallback(
    (
      newBoard: {
        id: number;
        value: null | 'X' | 'O';
      }[],
      depth: number,
      isMaximizing: boolean,
    ): number => {
      const score = evaluate(newBoard);
      if (score !== 0) return score - depth; // Prefer faster win
      if (isBoardFull(newBoard)) return 0;

      if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i += 1) {
          if (newBoard[i].value === EMPTY) {
            newBoard[i].value = AI_PLAYER;
            best = Math.max(best, minimax(newBoard, depth + 1, false));
            newBoard[i].value = EMPTY;
          }
        }
        return best;
      }
      let best = +Infinity;
      for (let i = 0; i < 9; i += 1) {
        if (newBoard[i].value === EMPTY) {
          newBoard[i].value = HUMAN_PLAYER;
          best = Math.min(best, minimax(newBoard, depth + 1, true));
          newBoard[i].value = EMPTY;
        }
      }
      return best;
    },
    [evaluate],
  );

  const findBestMove = useCallback(
    (board: Array<Array<{ id: number; value: null | 'X' | 'O' }>>) => {
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
    },
    [minimax],
  );

  useEffect(() => {
    if (
      isBoardFull(boxes.flat()) &&
      !checkWinner(boxes.flat(), HUMAN_PLAYER) &&
      !checkWinner(boxes.flat(), AI_PLAYER)
    ) {
      Alert.alert('Game Over', 'Draw!', [
        { text: 'Restart', onPress: resetGame },
      ]);
    }

    if (currentPlayer === AI_PLAYER) {
      const move = findBestMove(boxes);
      if (move !== -1) {
        const flatBoxes = boxes.flat();
        const row = Math.floor(move / 3);
        const column = move % 3;
        const newBoard = [...boxes];
        newBoard[row][column].value = AI_PLAYER;
        setBoxes(newBoard);
        setCurrentPlayer(HUMAN_PLAYER);

        if (checkWinner(flatBoxes, AI_PLAYER)) {
          Alert.alert('Game Over', 'AI wins!', [
            { text: 'Restart', onPress: resetGame },
          ]);
        }
      }
    } else {
      const flatBoxes = boxes.flat();
      if (checkWinner(flatBoxes, HUMAN_PLAYER)) {
        Alert.alert('Game Over', 'You win!', [
          { text: 'Restart', onPress: resetGame },
        ]);
      }
    }
  }, [isHumanTurn, boxes, currentPlayer, findBestMove]);

  const resetGame = () => {
    setBoxes(
      new Array(3)
        .fill(0)
        .map(() =>
          Array.from({ length: 3 }, (_, i) => ({ id: i, value: null })),
        ),
    );
  };

  const checkWinner = (
    board: {
      id: number;
      value: null | 'X' | 'O';
    }[],
    player: string,
  ) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    return winPatterns.some((pattern) =>
      pattern.every((index) => board[index].value === player),
    );
  };

  const isBoardFull = (
    board: {
      id: number;
      value: null | 'X' | 'O';
    }[],
  ) => {
    return board.every((cell) => cell.value !== EMPTY);
  };

  return (
    <>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg',
        }}
        style={{
          alignSelf: 'center',
          marginTop: 20,
          width: 100,
          height: 100,
        }}
        accessibilityIgnoresInvertColors
      />

      <View style={[styles.card, styles.centeredView]}>
        <View>
          {boxes.map((row, rowIndex) => (
            <View style={{ flexDirection: 'row' }} key={rowIndex}>
              {row.map((box, boxIndex) => (
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => {
                    const newBoxes = [...boxes];
                    if (newBoxes[rowIndex][boxIndex].value) {
                      return;
                    }
                    newBoxes[rowIndex][boxIndex] = {
                      ...newBoxes[rowIndex][boxIndex],
                      value: currentPlayer,
                    };
                    setBoxes(newBoxes);
                    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
                  }}
                  style={[styles.boxes, styles.centeredView]}
                  key={`${rowIndex}${boxIndex}`}
                >
                  {Boolean(box.value) && (
                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
                      {box.value}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.card, styles.centeredView]}>
        <Text style={styles.turnText}>
          Turn: {currentPlayer === HUMAN_PLAYER ? 'You' : 'AI'}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={resetGame}
          style={[styles.card, styles.centeredView]}
        >
          <Text style={[styles.turnText, styles.centeredText]}>
            Restart Game
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 18,
    backgroundColor: '#fefafa',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  centeredText: {
    textAlign: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxes: { width: 80, height: 80, borderWidth: 3 },
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
