/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { RouteProp } from '@react-navigation/native';
import { RootScreenProps } from 'src/navigators/types';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AI_PLAYER,
  HUMAN_PLAYER,
  findBestMove,
  checkWinner,
  isBoardFull,
  computeBoxBorder,
  Grid,
} from './utils';

const COLORS = {
  X: '#FF6EC7',
  O: '#BF00FF',
  EMPTY: '#000000',
};

export default function HomeScreenContent({
  route,
  navigation,
}: {
  route: RouteProp<RootScreenProps, 'Home'>;
  navigation: NativeStackNavigationProp<RootScreenProps, 'Home', undefined>;
}) {
  const [boxes, setBoxes] = useState<Grid>(
    new Array(3)
      .fill(0)
      .map((m, v) =>
        Array.from({ length: 3 }, (_, i) => ({ id: 3 * v + i, value: null })),
      ),
  );

  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
    route.params.player,
  );

  const flattenedBoxes = boxes.flat();

  const isHumanTurn = currentPlayer === HUMAN_PLAYER;

  const resetGame = useCallback(() => {
    setBoxes(
      new Array(3)
        .fill(0)
        .map(() =>
          Array.from({ length: 3 }, (_, i) => ({ id: i, value: null })),
        ),
    );
    setCurrentPlayer(route.params.player);
  }, [route.params.player]);

  useEffect(() => {
    if (
      isBoardFull(flattenedBoxes) &&
      !checkWinner(flattenedBoxes, HUMAN_PLAYER) &&
      !checkWinner(flattenedBoxes, AI_PLAYER)
    ) {
      Toast.show({
        text1: 'Game Over',
        text2: 'Draw!',
        type: 'info',
        position: 'bottom',
        visibilityTime: 2500,
        autoHide: true,
        bottomOffset: 50,
        onPress: resetGame,
        onHide: navigation.goBack,
      });
    }

    if (currentPlayer === AI_PLAYER) {
      const move = findBestMove(boxes);
      if (move !== -1) {
        const row = Math.floor(move / 3);
        const column = move % 3;
        const newBoard = [...boxes];
        newBoard[row][column].value = AI_PLAYER;
        setBoxes(newBoard);
        setCurrentPlayer(HUMAN_PLAYER);

        if (checkWinner(flattenedBoxes, AI_PLAYER)) {
          Toast.show({
            text1: 'Game Over',
            text2: 'You lost!',
            type: 'error',
            position: 'bottom',
            visibilityTime: 2500,
            autoHide: true,
            bottomOffset: 50,
            onPress: resetGame,
            onHide: navigation.goBack,
          });
        }
      }
    }
    if (checkWinner(flattenedBoxes, HUMAN_PLAYER)) {
      Toast.show({
        text1: 'Game Over',
        text2: 'You win!',
        type: 'success',
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
        onPress: resetGame,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isHumanTurn,
    boxes,
    currentPlayer,
    resetGame,
  ]);

  const handleBoxPress = (rowIndex: number, boxIndex: number) => {
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
  };

  return (
    <>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg',
        }}
        style={styles.image}
        accessibilityIgnoresInvertColors
      />

      <View style={[styles.card, styles.centeredView]}>
        <View>
          {boxes.map((row, rowIndex) => (
            <View style={{ flexDirection: 'row' }} key={rowIndex}>
              {row.map((box, boxIndex) => (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Box at row ${rowIndex + 1}, column ${boxIndex + 1}`}
                  accessibilityHint="Tap to mark this box"
                  onPress={() => handleBoxPress(rowIndex, boxIndex)}
                  style={[
                    styles.boxes,
                    styles.centeredView,
                    computeBoxBorder(rowIndex, boxIndex),
                    {
                      backgroundColor: box.value
                        ? COLORS[box.value]
                        : COLORS.EMPTY,
                    },
                  ]}
                  key={`${rowIndex}${boxIndex}`}
                >
                  {Boolean(box.value) && (
                    <Text style={styles.mark}>{box.value}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.card, styles.centeredView]}>
        <Text style={styles.turnText}>
          Turn: {currentPlayer === HUMAN_PLAYER ? 'You' : 'AI is thinking...'}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Restart Game"
          accessibilityHint="Tap to restart the game"
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
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  centeredText: {
    textAlign: 'center',
    color: '#fff',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxes: { width: 80, height: 80, borderWidth: 3, borderColor: '#fff' },
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
    height: 100,
  },
  mark: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
});
