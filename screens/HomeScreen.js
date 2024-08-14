import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Calisthenics App</Text>
      <Button title='Day 1: Push + Core' onPress={() => navigation.navigate('Workout', { day: 1 })} />
      <Button title='Day 2: Pull + Legs' onPress={() => navigation.navigate('Workout', { day: 2 })} />
      <Button title='Day 3: Push + Pull + Core' onPress={() => navigation.navigate('Workout', { day: 3 })} />
      <Button title='Day 4: Full Body or Specific Focus (Optional)' onPress={() => navigation.navigate('Workout', { day: 4 })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
