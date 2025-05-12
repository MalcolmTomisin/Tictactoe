import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';
import MenuScreen from 'src/screens/MenuScreen/MenuScreen';
import { RootScreenProps } from './types';

const navigatorScreenOptions: NativeStackNavigationOptions = {
  headerShadowVisible: false,
};

const Stack = createNativeStackNavigator<RootScreenProps>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      
    </Stack.Navigator>
  );
}
