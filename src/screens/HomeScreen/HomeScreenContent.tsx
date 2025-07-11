/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { RouteProp } from '@react-navigation/native';
import { RootScreenProps } from 'src/navigators/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AI_PLAYER, HUMAN_PLAYER, computeBoxBorder } from './utils';
import { useGameState } from './useGameState';
import { useGameLogic } from './useGameLogic';

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
  const {
    boxes,
    setBoxes,
    currentPlayer,
    setCurrentPlayer,
    resetGame,
    flattenedBoxes,
  } = useGameState(route.params.player);

  useGameLogic({
    boxes,
    currentPlayer,
    flattenedBoxes,
    isHumanTurn: currentPlayer === HUMAN_PLAYER,
    setBoxes,
    setCurrentPlayer,
    resetGame,
    navigation,
  });

  const handleBoxPress = (rowIndex: number, boxIndex: number) => {
    const newBoxes = [...boxes];
    if (currentPlayer !== HUMAN_PLAYER || newBoxes[rowIndex][boxIndex].value) {
      return;
    }
    newBoxes[rowIndex][boxIndex] = {
      ...newBoxes[rowIndex][boxIndex],
      value: currentPlayer,
    };
    setBoxes(newBoxes);
    setCurrentPlayer(AI_PLAYER);
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
            <View style={styles.row} key={rowIndex}>
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
      <View style={[styles.card, styles.centeredView, styles.row]}>
        <Text style={styles.turnText}>
          Turn: {currentPlayer === HUMAN_PLAYER ? 'You' : 'AI is thinking...'}
        </Text>
        {currentPlayer === AI_PLAYER && (
          <ActivityIndicator size="large" color={COLORS[currentPlayer]} />
        )}
      </View>
      <View>
        <TouchableOpacity
          accessibilityRole="text"
          accessibilityLabel="Restart Game"
          accessibilityHint="Tap to restart the game"
          onPress={resetGame}
          style={[styles.card, styles.centeredView, styles.maroonButton]}
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
  row: { flexDirection: 'row' },
  maroonButton: {
    backgroundColor: '#990000',
  },
});
