import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/numberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4,
  );
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.addEventListener('change', updateLayout);
    };
  }, [Dimensions]);

  const inputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be between 1 and 99', [
        {title: 'okay', style: 'destructive', onPress: resetInputHandler},
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedText;
  if (confirmed) {
    confirmedText = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new Game!</TitleText>
            <Card style={styles.inputcontainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                keyboardType="number-pad"
                maxLength={2}
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit
                onChangeText={inputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Reset"
                    onPress={() => {
                      resetInputHandler();
                    }}
                    color={Colors.accent}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    onPress={() => {
                      confirmInputHandler();
                    }}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedText}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    // marginVertical: 10,
  },
  inputcontainer: {
    minWidth: 300,
    width: '80%',
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 15,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4,
  // },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default StartGameScreen;
