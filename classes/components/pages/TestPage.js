import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';
import Page2 from './TestPage2.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      text: {
        fontSize: 30
      }
    });
  }

  async load() {
    const newData = await ApiCommunicator.getCar("bmw", "m240i g42");
    this.loadPage(newData);
  }

  loadedPageView(data) {
    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.styles.text}>Nom : {data.caracteristiques["ShownName"]}</Text>
        <Text style = {this.styles.text}>Prix : {data.caracteristiques["Starting Price"]}</Text>
        <Page2></Page2>
        <Button
          title="Aller page 2!"

          // Navigue à p.2
          onPress={() => this.props.navigation.navigate("Page 2")}
        />
      </View>
    )
  }
};
