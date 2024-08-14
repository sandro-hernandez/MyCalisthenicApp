import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function WorkoutScreen({ route, navigation }) {
  const { day } = route.params;

  const workouts = {
    1: [
      { name: 'Push-ups', sets: 3, reps: '12-15' },
      { name: 'Dips', sets: 3, reps: '10-12' },
      { name: 'Incline Push-ups', sets: 3, reps: '8-10' },
      { name: 'Plank', sets: 3, reps: '30-45 sec' },
      { name: 'Leg Raises', sets: 3, reps: '10-12' },
    ],
    2: [
      { name: 'Assisted Pull-ups or Negatives', sets: 3, reps: '6-8' },
      { name: 'Inverted Rows', sets: 3, reps: '10-12' },
      { name: 'Bodyweight Squats', sets: 3, reps: '15-20' },
      { name: 'Lunges', sets: 3, reps: '12-15 per leg' },
      { name: 'Glute Bridges', sets: 3, reps: '12-15' },
    ],
    3: [
      { name: 'Decline Push-ups or Pike Push-ups', sets: 3, reps: '8-12' },
      { name: 'Inverted Rows with Elevated Legs', sets: 3, reps: '10-12' },
      { name: 'Triceps Dips on Bench', sets: 3, reps: '10-12' },
      { name: 'Mountain Climbers', sets: 3, reps: '30-45 sec' },
      { name: 'Side Plank', sets: 3, reps: '20-30 s per side' },
    ],
    4: [
      { name: 'Pull-ups', sets: 3, reps: '6-8' },
      { name: 'Clap Push-ups', sets: 3, reps: '8-10' },
      { name: 'Assisted Pistol Squats', sets: 3, reps: '5-8 leg' },
      { name: 'Advanced Plank (L-sit for advanced core)', sets: 3, reps: '10-20 sec' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day {day}</Text>
      {workouts[day].map((workout, index) => (
        <Button
          key={index}
          title={`${workout.name} // ${workout.sets} sets // ${workout.reps} reps`}
          onPress={() => navigation.navigate('Exercise', { workout })}
        />
      ))}
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

export default WorkoutScreen;
