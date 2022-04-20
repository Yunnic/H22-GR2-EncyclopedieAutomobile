import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';
import ImageTitre from '../vueVoiture/imageTitre.js';

export default class CataloguePage extends Page {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
          padding : 20,
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
    this.hasLoadedOnce = false;

    this.renderItem = ({item}) => (
      <ImageTitre
      big
      title = {item.ShownName}
      imageSource = {{uri:item["Photo extérieur"]}}
      />
    )
  }

  async load() {
    const prjExpr2 = "ShownName, #pe, Brand, Model"
    const exprAttNames2 = {
      "#pe": "Photo extérieur"
    }

    const searchData = await ApiCommunicator.searchModels(prjExpr2, null, exprAttNames2, null, this.lastResult);
    const newData = {
      "searchData": searchData
    };

    this.loadPage(newData);
  }

  loadingIcon() {
    return (this.loading = <ActivityIndicator size="large" color="white"/>);
  }

  handleScroll(event, page) {
    const scrollHeight = event.nativeEvent.contentOffset.y;
    const screenHeight = event.nativeEvent.contentSize.height;
    const screenCurrentHeight = event.nativeEvent.layoutMeasurement.height;
    if (page.lastResult && !page.state.isLoading && scrollHeight + screenCurrentHeight + 20 > screenHeight) {
      page.reloadWithoutLoading();
    }
  }

  loadedPageView(data) {
    let count = this.searchComponents.length;
    let searchData = data.searchData
    let newItems = (searchData) ? data.searchData.Items : null;

    if (newItems){
      this.lastResult = data.searchData.LastEvaluatedKey;

      if (!this.hasLoadedOnce) {
        this.hasLoadedOnce = true;
      }

      for (const newItem of newItems) {

        this.searchComponents.push(newItem)
      }
    }

    this.state.data = [];

    console.log(this.searchComponents);

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Catalogue </Text>
        <FlatList
          contentContainerStyle = {this.baseStyle.container}
          onScroll = {(event) => this.handleScroll(event, this)}
          data = {this.searchComponents}
          renderItem = {this.renderItem}
          keyExtractor = {item => item.Model}
        />
      </View>
    )
  }
};
