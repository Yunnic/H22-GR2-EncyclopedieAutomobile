import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestPage} from '../components/page/TestPage.js';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TestPage} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
};
