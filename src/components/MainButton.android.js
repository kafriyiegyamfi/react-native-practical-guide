import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
        <View style={{...styles.button, ...props.style}}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },

  button: {
    backgroundColor: Colors.primary,
    marginVertical: 12,
    padding: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'OpenSans',
  },
});

export default MainButton;
