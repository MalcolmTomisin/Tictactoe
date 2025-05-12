import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootScreenProps } from 'src/navigators/types';

export default function MenuScreenContent({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootScreenProps, 'Menu'>;
}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg',
        }}
        style={{
          alignSelf: 'center',
          width: 150,
          height: 150,
        }}
        accessibilityIgnoresInvertColors
      />
      <View>
        <TouchableOpacity
          accessibilityRole="button"
          style={{
            backgroundColor: '#FF6EC7',
            width: 200,
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
          onPress={() => {
            navigation.navigate('Home', { player: 'O' });
          }}
        >
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
            AI goes first
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          style={{
            backgroundColor: '#BF00FF',
            width: 200,
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
          onPress={() => {
            navigation.navigate('Home', { player: 'X' });
          }}
        >
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
            You go first
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
