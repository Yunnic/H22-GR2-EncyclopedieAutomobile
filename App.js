import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/MainMenu';
import { Card } from 'react-native-paper';

//let a = 5 + 2 + "a"

export default function App() {
  return (
    <View style={styles.container}>
      //<Text>ceci est {a}</Text>
      <Card>
        <MainMenu />
      </Card>
      <StatusBar style="auto" />
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
