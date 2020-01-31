import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import NumberContainer from '../components/numberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton.android';
import Icon from 'react-native-vector-icons/Ionicons';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess.toString());
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {onGameOver, userChoice} = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.addEventListener('change', updateLayout);
    };
  }, [availableDeviceWidth, availableDeviceHeight]);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  let listContainer = styles.listContainer;

  if (availableDeviceWidth > 400) {
    listContainer = styles.listContainerBig;
  }

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.controls}>
          <MainButton
            style={{backgroundColor: Colors.accent}}
            onPress={nextGuessHandler.bind(this, 'lower')}>
            <Icon name="md-remove" size={30} />
          </MainButton>
          <NumberContainer style={{marginHorizontal: 20}}>
            {currentGuess}
          </NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Icon name="md-add" size={30} />
          </MainButton>
        </View>
        <View style={listContainer}>
          {/*
          <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index),
          )}
        </ScrollView>
      */}

          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          style={{backgroundColor: Colors.accent}}
          onPress={nextGuessHandler.bind(this, 'lower')}>
          <Icon name="md-remove" size={30} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Icon name="md-add" size={30} />
        </MainButton>
      </Card>
      <View style={listContainer}>
        {/*<ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index),
          )}
        </ScrollView>*/}

        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    minWidth: 300,
    maxWidth: '95%',
    width: '80%',
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  listContainerBig: {
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default GameScreen;
