//Il se peut que le code ne soit pas très lisible, c'est un test.

import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 40,
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

    const prjExpr3 = "ShownName, #br, #md, #pe"
    const keyCondiExpr3 = "#br = :brText AND #md between :mdText1 AND :mdText2"
    const exprAttNames3 = {
      "#md": "Model",
      "#br": "Brand",
      "#pe": "Photo extérieur"
    }
    const exprAttVal3 = {
      ":brText": "bmw",
      ":mdText1": "m2",
      ":mdText2": "m2z"
    }

    const newData1 = await ApiCommunicator.getBrand("mitsubishi");
    const newData2 = await ApiCommunicator.searchBrands(prjExpr1, filtExpr1,
      exprAttNames1, exprAttVal1, null);
    const newData3 = await ApiCommunicator.searchModels(prjExpr2, filtExpr2,
      exprAttNames2, exprAttVal2, null);
    const newData4 = await ApiCommunicator.searchBrandModels(prjExpr3,
      keyCondiExpr3, null, exprAttNames3, exprAttVal3, null);
    const newData = {
      "newData1": newData1, "newData2": newData2,
      "newData3": newData3, "newData4": newData4
    };
    this.loadPage(newData);
  }

  loadedPageView(data) {
    return(
      <ScrollView contentContainerStyle = {styles.container}>
        <Text>{data.newData1.ShownName}</Text>
        <Image
          style = {styles.logo}
          source = {{uri: data.newData1.Logo}}
        />
        <Text>Recherche 1 (Brand) : "vo" :</Text>
        <Text>{JSON.stringify(data.newData2)}</Text>

        <Text>Recherche 2 (Model) : "mw" :</Text>
        <Text>{JSON.stringify(data.newData3)}</Text>

        <Text>Recherche 3 (BrandModel) : "bmw" avec model de "m2" à "m3" :</Text>
        <Text>{JSON.stringify(data.newData4)}</Text>
        <Button
          title="Retourner à la page 1!"

          // Navigue à p.1
          onPress={() => this.props.navigation.navigate("Page 1")}
        />
      </ScrollView>
    )
  }
};
