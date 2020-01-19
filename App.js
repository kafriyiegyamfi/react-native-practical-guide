import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };
  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  };
   let content = <StartGameScreen onStartGame={startGameHandler} />;
  // let content = (
  //   <GameOverScreen
  //     userNumber={1}
  //     rounds={1}
  //     onRestart={configureNewGameHandler}
  //   />
  // );
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (userNumber > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        rounds={guessRounds}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
});

export default App;
