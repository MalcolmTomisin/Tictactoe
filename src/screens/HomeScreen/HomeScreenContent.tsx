/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

// TODO: sample, remove
export default function HomeScreenContent() {
  const [boxes, setBoxes] = useState<
    Array<Array<{ id: number; value: null | 'x' | 'o' }>>
  >(
    new Array(3).fill(0).map(() =>
      Array.from({ length: 3 }, (_, i) => ({ id: i, value: null }))
    ),
  );

  const [currentPlayer, setCurrentPlayer] = useState<'x' | 'o'>('x');
  return (
    <>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg',
        }}
        style={{
          alignSelf: 'center',
          marginTop: 20,
          width: 150,
          height: 150,
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
                  onPress={(e) => {
                    if (e.currentTarget) {
                      const newBoxes = [...boxes];
                      newBoxes[rowIndex][boxIndex] = {
                        ...newBoxes[rowIndex][boxIndex],
                        value: currentPlayer,
                      };
                      setBoxes(newBoxes);
                      setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
                    }
                  }}
                  style={[styles.boxes, styles.centeredView]}
                  key={`${rowIndex}${boxIndex}`}
                >
                  {Boolean(box.value) && <Text style={{fontSize: 35, fontWeight: 'bold'}}>{box.value}</Text>}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
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

});
