import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text> The Game is Over!</Text>
      <Text> The Number is :{props.userNumber}</Text>
      <Text styles={{fontFamily: 'OpenSans-Bold'}}>
        {' '}
        The NUmber of guess rounds :{props.rounds}
      </Text>
      <Button title="Restart" onPress={props.onRestart} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameOverScreen;
