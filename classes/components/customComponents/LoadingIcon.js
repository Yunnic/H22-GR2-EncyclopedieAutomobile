import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default class LoadingIcon extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ActivityIndicator size="large" color="white"/>
    );
  };
};
