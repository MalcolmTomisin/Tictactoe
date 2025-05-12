import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootScreenProps = {
  Home: {
    player: 'X' | 'O';
  };
  Menu: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootScreenProps> =
  NativeStackScreenProps<RootScreenProps, Screen>;
