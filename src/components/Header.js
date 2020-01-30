import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';
const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
  },
  headerIOS: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },

  headerAndroid: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
    fontSize: 18,
  },
});

export default Header;
