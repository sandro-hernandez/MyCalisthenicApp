import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HistoryScreen({ route }) {
  const { workoutName } = route.params;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(workoutName);
        console.log('Retrieved History:', storedHistory);  // Debugging: Log retrieved history
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchHistory();
  }, [workoutName]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{workoutName} History</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHeader}>Date</Text>
          <Text style={styles.cellHeader}>Set 1</Text>
          <Text style={styles.cellHeader}>Set 2</Text>
          <Text style={styles.cellHeader}>Set 3</Text>
          <Text style={styles.cellHeader}>Total</Text>
        </View>
        {history.length > 0 ? (
          history.map((entry, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{entry.date}</Text>
              <Text style={styles.cell}>{entry.sets[0]}</Text>
              <Text style={styles.cell}>{entry.sets[1]}</Text>
              <Text style={styles.cell}>{entry.sets[2]}</Text>
              <Text style={styles.cell}>{entry.total}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No history available</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cellHeader: {
    fontWeight: 'bold',
    width: '16.6%',
    textAlign: 'center',
  },
  cell: {
    width: '16.6%',
    textAlign: 'center',
  },
  noData: {
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default HistoryScreen;
