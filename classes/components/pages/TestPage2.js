import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default class TestPage extends Page {

  constructor(props) {
    super(props, StyleSheet.create({
      container: {
        flex: 1,
        marginHorizontal: 16,
      }
    }));
  }

  async load() {
    const newData = await ApiCommunicator.getCar("BMW", "M3");
    this.loadPage(newData);
  }

  loadedPageView(data) {
    return(
      <View style = {this.baseStyle.container}>
        <Text>{JSON.stringify(data)}</Text>
        <Text>:)</Text>
        <Button
          title="Aller page 1!"

          // Navigue à p.1
          onPress={() => this.props.navigation.navigate("Page 1")}
        />
      </View>
    )
  }
};
