### TicTacToe
#### Overview
This project is a simple implementation of the classic TicTacToe game. It allows users to play against an unbeatable AI. The game ends after every draw or loss, and users can restart the game or navigate back to the menu. This project is initialized with [**Belt**](https://github.com/thoughtbot/belt) a tool I helped build at thoughtbot, a commandline tool for scaffolding opinioniated expo apps.

#### Features
1. ##### Menu Screen:
- Users can choose who goes first: the AI or themselves.
- Simple and intuitive UI with two buttons for player selection.
2. ##### Game Screen:
- A 3x3 grid for the TicTacToe game.
- Players take turns marking the grid with "X" or "O".
- AI is unbeatable and uses the Minimax algorithm for optimal moves.
- Displays the current player's turn.
- Shows a toast message for game outcomes (win 😅, loss, or draw).
- Allows users to restart the game or navigate back to the menu.

#### Design Decisions
Architecture
- <b> Component-based Design:</b> The app is structured into reusable components to ensure modularity and maintainability.
- <b> Modular Folder Structure:</b> Organized into screens, components, utilities, and test directories for clarity and separation of concerns.

#### Libraries and Tools
- <b> React Navigation:</b> Manages navigation between the menu and game screens.
- <b> React Native Toast Message:</b> Displays toast notifications for game outcomes.
- <b>Expo Image: </b> Handles image rendering for the TicTacToe logo.
React Native Testing Library: Used for unit testing components and screens.

Trade-offs

- While minimax is unbeatable, the algorithm may take longer during initial loads because of its recursive search of the cells. Because of this I prioritized UI animations and interactions(i.e. navigation) because the algorithm may block UI actions. You may notice that by removing the requestAnimationFrame callback.

<b> Key Features: </b>
- Displays a 3x3 grid.
- Handles player and AI turns.
- Detects game outcomes (win - lol, loss, or draw) and displays appropriate toast messages.
- Allows users to restart the game or navigate back to the menu.

#### Testing
- <b> Unit Tests:</b>
    - Menu Screen: Tests navigation behavior and button interactions.
    - Game Screen: Tests game logic, including player moves, AI moves, and game outcomes.
- <b> Tools:</b>
    - Jest: Test runner.
    - React Native Testing Library: For rendering and interacting with components in tests.

##### Future Improvements

- Verify navigation flows between the menu and game screens (Integration tests).
- Improve accessibility for screen readers and other assistive technologies.
- UI Enhancements like animations

##### How to Run the App
1. Clone the repository:
```bash 
git clone <repository-url> 
```
2. Install dependencies:
```bash 
yarn 
```
Run the app on a simulator:
```bash
yarn ios
```

##### How to Run the Tests
1. Clone the repository:
```bash 
git clone <repository-url> 
```
2. Install dependencies:
```bash 
yarn 
```
3. Run tests:
```bash
yarn test
```
