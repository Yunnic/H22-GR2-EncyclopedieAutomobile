import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import ImageTitre from '../vueVoiture/imageTitre.js';
import Page from './Page.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
    horizontalList: {
      flexDirection:'row',
      alignItems: 'center'
    },
    vertictalList: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center'
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
          <Text>{JSON.stringify(data)}</Text>
          <View style = {this.styles.horizontalList}>
            <ImageTitre
            imageSource = {{uri: "https://wp.usatodaysports.com/wp-content/uploads/sites/90/2014/04/baseball.gif"}}
            title = ":)"
            big/>
            <ImageTitre big/>
            <View style = {this.styles.vertictalList}>
              <ImageTitre/>
              <ImageTitre/>
            </View>
          </View>
        <Button
          title="Aller page 2!"
          // Navigue à p.2
          onPress={() => this.props.navigation.navigate("Page 2")}
        />
      </View>
    )
  }
};
