import { StatusBar } from 'expo-status-bar';
import Screen from 'src/components/Screen';
import { RootStackScreenProps } from 'src/navigators/types';
import MenuScreenContent from './MenuScreenContent';

export default function MenuScreen({navigation}: RootStackScreenProps<'Menu'>) {
  return (
    <Screen scroll={false}>
      <MenuScreenContent navigation={navigation} />
      <StatusBar style="auto" />
    </Screen>
  );
}
