import { StatusBar } from 'expo-status-bar';
import Screen from 'src/components/Screen';
import { RootStackScreenProps } from 'src/navigators/types';
import HomeScreenContent from './HomeScreenContent';

export default function HomeScreen({route, navigation}: RootStackScreenProps<'Home'>) {
  return (
    <Screen>
      <HomeScreenContent route={route} navigation={navigation} />
      <StatusBar style="auto" />
    </Screen>
  );
}
