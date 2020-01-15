import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';

function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      <StartGameScreen /> 
    </View>
  );
}
const styles = StyleSheet.create({
  flex: 1,
});

export default App;
