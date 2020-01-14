import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Button} from 'react-native';

import GoalItem from './src/components/GoalItem';
import GoalInput from './src/components/GoalInput';

function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0) {
      return;
    }
    setCourseGoals(currentGoals => [
      ...currentGoals,
      {id: Math.random().toString(), value: goalTitle},
    ]);
    setIsAddMode(false);
  };
  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };
  const cancelAddGoal = () => {
    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Button
        title="add new Goal"
        onPress={() => {
          setIsAddMode(true);
        }}
      />
      <GoalInput
        onAdd={addGoalHandler}
        visible={isAddMode}
        onCancel={cancelAddGoal}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={ItemData => (
          <GoalItem
            id={ItemData.item.id}
            title={ItemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});

export default App;
