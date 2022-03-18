import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Image } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default class TestPage extends Page {

  constructor(props) {
    super(props);
  }

  async load() {
    const newData = await ApiCommunicator.getBrand("Mitsubishi");
    this.loadPage(newData);
  }

  loadedPageView(data) {
    return(
      <View style = {styles.container}>
        <Text>{data.Name}</Text>
        <Image
          style = {styles.logo}
          source = {{uri: data.Logo}}
        />
        <Button
          title="Aller page 1!"

          // Navigue à p.1
          onPress={() => this.props.navigation.navigate("Page 1")}
        />
      </View>
    )
  }
};
