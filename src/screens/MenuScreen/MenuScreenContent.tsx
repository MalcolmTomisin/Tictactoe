import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootScreenProps } from 'src/navigators/types';

export default function MenuScreenContent({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootScreenProps, 'Menu'>;
}) {
  const handleButtonPress = (player: 'X' | 'O') => {
    requestAnimationFrame(() => {
      navigation.navigate('Home', { player });
    })
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg',
        }}
        style={styles.centeredImage}
        accessibilityIgnoresInvertColors
        accessibilityRole="image"
        accessible
      />
      <View>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.pinkButton}
          onPress={() => handleButtonPress('O')}
        >
          <Text style={styles.buttonLabel}>AI goes first</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.purpleButton}
          onPressIn={() => handleButtonPress('X')}
        >
          <Text style={styles.buttonLabel}>You go first</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredImage: {
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  pinkButton: {
    backgroundColor: '#FF6EC7',
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  purpleButton: {
    backgroundColor: '#BF00FF',
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonLabel: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
});
