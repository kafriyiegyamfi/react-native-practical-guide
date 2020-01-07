import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Button} from 'react-native';

function App() {
  const [Goal, setGoal] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
        <TextInput
          style={styles.textform}
          // onChange={()=>setGoal()}
          placeholder=" Enter goal here"
        />
        <Button title="add" />
      </View>
      <View style={styles.goalList}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  textbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textform: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    width: '80%',
  },
});

export default App;
