import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);

    this.goToError = false;

    this.errorStyle = StyleSheet.create({
      text: {
        color: 'red'
      }
    });
  }

  loadedPageView(data) {
    const route = this.props.route;
    const {catchedError} = route.params;
    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.errorStyle.text}>{"ERROR : " + catchedError}</Text>
        <Button
          style = {this.errorStyle.text}
          title = "Retourner à la page principale"

          // Navigue à p.2
          onPress={() => this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Page 1'}]
          })}
        />
      </View>
    )
  }
};
