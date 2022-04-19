import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';
import ImageTitre from '../vueVoiture/imageTitre.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
          paddingTop: 30,
          flexGrow : 1,
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor : "#4d4d4d",
        },
        title: {
          marginTop: 16,
          marginBottom: 16,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },
    });

    this.searchComponents = [];
    this.lastResult = null;
  }

  async load() {

    const prjExpr2 = "ShownName, #pe, Brand, Model"
    const exprAttNames2 = {
      "#pe": "Photo extérieur"
    }

    const searchData = await ApiCommunicator.searchModels(prjExpr2, null, exprAttNames2);
    const newData = {
      "searchData": searchData
    };

    this.loadPage(newData);
  }

  loadedPageView(data) {

    let count = this.searchComponents.length;
    let newItems = data.searchData.Items;
    this.lastResult = data.searchData.LastEvaluatedKey;
    console.log(this.lastResult);

    for (const newItem of newItems) {
      this.searchComponents.push(
        <View key={count++}>
          <ImageTitre
          title = {newItem.ShownName}
          imageSource = {{uri : newItem["Photo extérieur"]}}
          big
          />
        </View>
      )
    }

    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Catalogue </Text>
        {this.searchComponents}
      </ScrollView>
    )
  }
};
