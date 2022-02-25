import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './components/MainMenu';

let a = 5 + 2 + "a"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ceci est {a}</Text>
      <StatusBar style="auto" />
      <MainMenu />
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
