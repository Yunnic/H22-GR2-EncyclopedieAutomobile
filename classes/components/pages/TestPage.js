import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);
  }

  async load() {
    const newData = await ApiCommunicator.getCar("bmw", "m240i g42");
    console.log(newData);
    this.loadPage(newData);
  }

  loadedPageView(data) {
    return(
      <View style = {this.baseStyle.container}>
        <Text>{JSON.stringify(data)}</Text>
        <Button
          title="Aller page 2!"

          // Navigue à p.2
          onPress={() => this.props.navigation.navigate("Page 2")}
        />
      </View>
    )
  }
};
