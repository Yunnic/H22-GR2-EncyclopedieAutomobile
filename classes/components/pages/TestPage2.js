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

    const prjExpr1 = "#nm, Logo"
    const filtExpr1 = "contains(#nm, :nmText)"
    const exprAttNames1 = {
      "#nm": "Name"
    }
    const exprAttVal1 = {
      ":nmText": "vo"
    }

    const prjExpr2 = "ShownName, Brand, Model"
    const filtExpr2 = "contains(#sn, :snText)"
    const exprAttNames2 = {
      "#sn": "SearchName"
    }
    const exprAttVal2 = {
      ":snText": "mw"
    }

    const newData1 = await ApiCommunicator.getBrand("mitsubishi");
    const newData2 = await ApiCommunicator.searchBrands(prjExpr1, filtExpr1,
      exprAttNames1, exprAttVal1, null);
    const newData3 = await ApiCommunicator.searchModels(prjExpr2, filtExpr2,
      exprAttNames2, exprAttVal2, null);
    const newData = {"newData1": newData1, "newData2": newData2, "newData3": newData3};
    this.loadPage(newData);
  }

  errorCatcher(data) {
    if (data.newData1 == undefined || data.newData2 == undefined || data.newData3 == undefined) {
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
        <Text>Recherche 1 (Brand) : "vo" :</Text>
        <Text>{JSON.stringify(data.newData2)}</Text>

        <Text>Recherche 2 (Model) : "mw" :</Text>
        <Text>{JSON.stringify(data.newData3)}</Text>
        <Button
          title="Retourner à la page 1!"

          // Navigue à p.1
          onPress={() => this.props.navigation.navigate("Page 1")}
        />
      </View>
    )
  }
};
