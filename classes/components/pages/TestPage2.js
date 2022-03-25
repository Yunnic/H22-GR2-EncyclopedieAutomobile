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

    const prjExpr = "#nm, Logo"
    const filtExpr = "contains(#nm, :nmText)"
    const exprAttNames = {
      "#nm": "Name"
    }
    const exprAttVal = {
      ":nmText": "vo"
    }

    const newData1 = await ApiCommunicator.getBrand("mitsubishi");
    const newData2 = await ApiCommunicator.searchBrand(prjExpr, filtExpr,
      exprAttNames, exprAttVal, null)
    const newData = {"newData1": newData1, "newData2": newData2};
    this.loadPage(newData);
  }

  errorCatcher(data) {
    if (data.newData1 == undefined || data.newData2 == undefined) {
      return "Data is missing!";
    }

    return null;
  }

  loadedPageView(data) {
    return(
      <View style = {styles.container}>
        <Text>{data.newData1.ShownName}</Text>
        <Image
          style = {styles.logo}
          source = {{uri: data.newData1.Logo}}
        />
        <Text>{JSON.stringify(data.newData2)}</Text>
        <Button
          title="Aller page 1!"

          // Navigue à p.1
          onPress={() => this.props.navigation.navigate("Page 1")}
        />
      </View>
    )
  }
};
