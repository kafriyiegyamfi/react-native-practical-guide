import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';

function App() {
  const [userNumber, setUserNumber] = useState();
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}
const styles = StyleSheet.create({
  flex: 1,
});

export default App;
