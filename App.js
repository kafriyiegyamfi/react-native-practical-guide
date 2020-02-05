import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import MealsNavigator from './src/navigation/MealsNavigator';

const AppContainer = createAppContainer(MealsNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
