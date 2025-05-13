/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootScreenProps } from 'src/navigators/types';
import MenuScreenContent from './MenuScreenContent';

describe('MenuScreenContent', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as unknown as NativeStackNavigationProp<RootScreenProps, 'Menu'>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderScreen = () =>
    render(<MenuScreenContent navigation={mockNavigation} />);

  it('renders the component correctly', () => {
    const screen = renderScreen();

    const image = screen.getByRole('image');
    expect(image).toBeTruthy();

    expect(screen.getByText('AI goes first')).toBeTruthy();
    expect(screen.getByText('You go first')).toBeTruthy();
  });

  it('navigates to the Home screen with AI as the first player when "AI goes first" is pressed', () => {
    const screen = renderScreen();

    const aiButton = screen.getByText('AI goes first');
    fireEvent.press(aiButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', {
      player: 'O',
    });
  });

  it('navigates to the Home screen with the human as the first player when "You go first" is pressed', () => {
    const screen = renderScreen();
    const humanButton = screen.getByText('You go first');
    fireEvent.press(humanButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', {
      player: 'X',
    });
  });
});
