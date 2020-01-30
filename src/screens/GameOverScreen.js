import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ScrollView,
} from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText> The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            //source={{uri:"https:// "}}
            source={require('../assets/success.png')}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess
            the Number <Text style={styles.highlight}>{props.userNumber}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width > 400 ? 300 : 200,
    height: Dimensions.get('window').width > 400 ? 300 : 200,
    borderRadius: 150,
    borderColor: 'black',
    overflow: 'hidden',
    borderWidth: 3,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
  },
  resultContainer: {
    width: '80%',
    marginVertical: 20,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default GameOverScreen;
