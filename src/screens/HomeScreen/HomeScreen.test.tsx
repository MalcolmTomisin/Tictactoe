/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { RootScreenProps } from 'src/navigators/types';
import HomeScreen from './HomeScreen';

// Mock dependencies
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock('./utils', () => ({
  AI_PLAYER: 'O',
  HUMAN_PLAYER: 'X',
  findBestMove: jest.fn(() => 4),
  checkWinner: jest.fn(() => false),
  isBoardFull: jest.fn(() => false),
  computeBoxBorder: jest.fn(() => ({})),
}));

const mockNavigation = {
  navigate: jest.fn() as any,
  goBack: jest.fn() as any,
  push: jest.fn() as any,
  pop: jest.fn() as any,
  replace: jest.fn() as any,
  setParams: jest.fn() as any,
  popToTop: jest.fn() as any,
  addListener: jest.fn().mockReturnValue(jest.fn) as any,
  isFocused: jest.fn() as any,
  reset: jest.fn() as any,
  dispatch: jest.fn() as any,
  dangerouslyGetParent: jest.fn() as any,
  canGoBack: jest.fn() as any,
  getParent: jest.fn() as any,
  dangerouslyGetState: jest.fn() as any,
  getState: jest.fn() as any,
  setOptions: jest.fn() as any,
  removeListener: jest.fn() as any,
  getId: jest.fn() as any,
};

const mockRoute = {
  params: {
    player: 'X',
  },
} as unknown as RouteProp<RootScreenProps, 'Home'>;

const renderHomeScreen = () => {
  return render(
    <NavigationContainer>
      <HomeScreen route={mockRoute} navigation={mockNavigation} />
    </NavigationContainer>,
  );
};

describe('HomeScreenContent', () => {
  it('renders the game board correctly', () => {
    const screen = renderHomeScreen();

    const boxes = screen.getAllByRole('button');
    expect(boxes).toHaveLength(9);
  });

  it('allows a human player to make a move', () => {
    const screen = renderHomeScreen();

    const boxes = screen.getAllByRole('button');
    fireEvent.press(boxes[0]);

    expect(screen.getByText('X')).toBeTruthy();
  });

  it('prevents a move on an already occupied box', () => {
    const screen = renderHomeScreen();

    const boxes = screen.getAllByRole('button');
    fireEvent.press(boxes[0]);
    fireEvent.press(boxes[0]);
    fireEvent.press(boxes[0]);
    fireEvent.press(boxes[0]);

    const boxWithX = screen.getAllByText('X');

    expect(boxWithX).toHaveLength(1);
  });

  it('resets the game when the restart button is pressed', () => {
    const screen = renderHomeScreen();

    const boxes = screen.getAllByRole('button');
    fireEvent.press(boxes[0]);
    expect(screen.getByText('X')).toBeTruthy();

    const restartButton = screen.getByText('Restart Game');
    fireEvent.press(restartButton);

    expect(screen.queryByText('X')).toBeFalsy();
  });

  it('shows a toast when the game ends in a draw', async () => {
    const screen = renderHomeScreen();

    const { isBoardFull }: { isBoardFull: jest.Mock } = require('./utils');
    isBoardFull.mockReturnValueOnce(true);

    const boxes = screen.getAllByRole('button');
    fireEvent.press(boxes[0]);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: 'Game Over',
          text2: 'Draw!',
        }),
      );
    });
  });

  it('shows a toast when the human player wins', async () => {
    const screen = renderHomeScreen();

    const { checkWinner }: { checkWinner: jest.Mock } = require('./utils');
    checkWinner.mockImplementation((_, player) => player === 'X');

    const boxes = screen.getAllByRole('button');
    fireEvent.press(boxes[0]);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: 'Game Over',
          text2: 'You win!',
        }),
      );
    });
  });

  it('shows a toast when the AI wins', async () => {
    const screen = renderHomeScreen();

    const { checkWinner }: { checkWinner: jest.Mock } = require('./utils');
    checkWinner.mockImplementation((_, player) => player === 'O');

    const boxes = screen.getAllByRole('button');
    fireEvent.press(boxes[0]);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          text1: 'Game Over',
          text2: 'You lost!',
        }),
      );
    });
  });
});
