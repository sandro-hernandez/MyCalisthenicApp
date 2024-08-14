import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ExerciseScreen({ route, navigation }) {
  const { workout } = route.params;
  const [reps, setReps] = useState(Array(workout.sets).fill(''));
  const [completed, setCompleted] = useState(false);

  // Add the clearHistory function here
  /*
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(workout.name);
      console.log(`History cleared for ${workout.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clearHistory(); // Temporarily clear the history on component mount
  }, []);
  */

  const handleComplete = async () => {
    try {
      const currentResults = reps.map(rep => parseInt(rep) || 0);
      const total = currentResults.reduce((sum, rep) => sum + rep, 0);
      const newEntry = {
        date: new Date().toLocaleString(),
        sets: currentResults,
        total,
      };

      // Fetch existing history
      const existingHistory = await AsyncStorage.getItem(workout.name);
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      // Add new entry to history
      history.push(newEntry);

      // Save updated history as a JSON string
      await AsyncStorage.setItem(workout.name, JSON.stringify(history));

      setCompleted(true);
      Alert.alert('Workout Saved!', `Sets: ${currentResults.join(', ')} | Total: ${total}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      {reps.map((_, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text>{index + 1} set</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => {
              const newReps = [...reps];
              newReps[index] = value;
              setReps(newReps);
            }}
            value={reps[index].toString()}
          />
          <Text>reps</Text>
        </View>
      ))}
      
      <Button title="Complete" onPress={handleComplete} />
      
      <Button
        title="View History"
        onPress={() => navigation.navigate('History', { workoutName: workout.name })}
      />

      {completed && (
        <View style={styles.results}>
          <Text>Workout saved successfully!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginHorizontal: 10,
    width: 50,
    textAlign: 'center',
  },
  results: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ExerciseScreen;
