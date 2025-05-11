import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from 'src/screens/HomeScreen/HomeScreen';

const navigatorScreenOptions: NativeStackNavigationOptions = {
  headerShadowVisible: false,
};

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
