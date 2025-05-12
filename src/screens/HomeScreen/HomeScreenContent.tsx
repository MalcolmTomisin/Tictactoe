/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { Image } from 'expo-image';
import { RouteProp } from '@react-navigation/native';
import { RootScreenProps } from 'src/navigators/types';
import {
  AI_PLAYER,
  HUMAN_PLAYER,
  findBestMove,
  checkWinner,
  isBoardFull,
  computeBoxBorder,
  Grid,
} from './utils';

export default function HomeScreenContent({
  route,
}: {
  route: RouteProp<RootScreenProps, 'Home'>;
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

  const isHumanTurn = currentPlayer === HUMAN_PLAYER;

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
  }, [isHumanTurn, boxes, currentPlayer]);

  const resetGame = () => {
    setBoxes(
      new Array(3)
        .fill(0)
        .map(() =>
          Array.from({ length: 3 }, (_, i) => ({ id: i, value: null })),
        ),
    );
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
                  style={[
                    styles.boxes,
                    styles.centeredView,
                    computeBoxBorder(rowIndex, boxIndex),
                    {
                      backgroundColor:
                        box.value === 'X'
                          ? '#FF6EC7'
                          : box.value === 'O'
                            ? '#BF00FF'
                            : '#000000',
                    },
                  ]}
                  key={`${rowIndex}${boxIndex}`}
                >
                  {Boolean(box.value) && (
                    <Text
                      style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
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
    // backgroundColor: '#fefafa',
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
});
