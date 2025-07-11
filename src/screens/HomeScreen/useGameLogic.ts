/* eslint-disable import/prefer-default-export */
import { useLayoutEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootScreenProps } from 'src/navigators/types';
import {
  AI_PLAYER,
  HUMAN_PLAYER,
  findBestMove,
  checkWinner,
  isBoardFull,
  Grid,
} from './utils';

interface UseGameLogicParams {
  boxes: Grid;
  currentPlayer: 'X' | 'O';
  flattenedBoxes: Array<{ id: number; value: 'X' | 'O' | null }>;
  isHumanTurn: boolean;
  setBoxes: (boxes: Grid) => void;
  setCurrentPlayer: (player: 'X' | 'O') => void;
  resetGame: () => void;
  navigation: NativeStackNavigationProp<RootScreenProps, 'Home', undefined>;
}

export const useGameLogic = ({
  boxes,
  currentPlayer,
  flattenedBoxes,
  isHumanTurn,
  setBoxes,
  setCurrentPlayer,
  resetGame,
  navigation,
}: UseGameLogicParams) => {
  useLayoutEffect(() => {
    if (
      isBoardFull(flattenedBoxes) &&
      !checkWinner(flattenedBoxes, HUMAN_PLAYER) &&
      !checkWinner(flattenedBoxes, AI_PLAYER)
    ) {
      Toast.show({
        text1: 'Game Over',
        text2: 'Draw!',
        type: 'info',
        position: 'bottom',
        visibilityTime: 2500,
        autoHide: true,
        bottomOffset: 50,
        onPress: resetGame,
        onHide: () => {
          resetGame();
          navigation.goBack();
        },
      });
    }

    requestAnimationFrame(() => {
      if (currentPlayer === AI_PLAYER) {
        const move = findBestMove(boxes);
        if (move !== -1) {
          const row = Math.floor(move / 3);
          const column = move % 3;
          const newBoard = [...boxes];
          newBoard[row][column].value = AI_PLAYER;
          setBoxes(newBoard);
          setCurrentPlayer(HUMAN_PLAYER);

          if (checkWinner(flattenedBoxes, AI_PLAYER)) {
            Toast.show({
              text1: 'Game Over',
              text2: 'You lost!',
              type: 'error',
              position: 'bottom',
              visibilityTime: 2500,
              autoHide: true,
              bottomOffset: 50,
              onPress: resetGame,
              onHide: () => {
                resetGame();
                navigation.goBack();
              },
            });
          }
        }
      }
    });

    if (checkWinner(flattenedBoxes, HUMAN_PLAYER)) {
      Toast.show({
        text1: 'Game Over',
        text2: 'You win!',
        type: 'success',
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 50,
        onPress: () => {
          resetGame();
          navigation.goBack();
        },
      });
    }
  }, [
    isHumanTurn,
    boxes,
    currentPlayer,
    resetGame,
    flattenedBoxes,
    navigation,
    setBoxes,
    setCurrentPlayer,
  ]);
};