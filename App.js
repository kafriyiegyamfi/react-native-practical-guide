import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function App() {
  const [outputText, setOutputText] = useState('Open App.js to start working');
  return (
    <View style={styles.container}>
      <Text>Welcome!, {outputText}</Text>
      <Button
        title="Change Text"
        onPress={() => {
          setOutputText('The Text has changed!');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
