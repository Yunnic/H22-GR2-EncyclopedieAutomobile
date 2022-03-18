import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

export default class TestPage extends Page {

  constructor(props) {
    //Si vous voulez changer le style du premier view, remplacer null par style.
    super(props, null);
  }

  async load() {
    const newData = await ApiCommunicator.getCar("BMW a", "M3");
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
