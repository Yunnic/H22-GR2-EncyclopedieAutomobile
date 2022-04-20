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
        list : {
          padding : 20,
          paddingBottom: 75,
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
    console.log("yesss!!!!!!!!");
    return (<ActivityIndicator size="large" color="white"/>);
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
    const lastModelIsLoad = count > 0 && this.searchComponents[count-1].Model == "load";

    if (newItems){


      if (lastModelIsLoad) {
        this.searchComponents.pop();
      }

      this.lastResult = data.searchData.LastEvaluatedKey;

      if (!this.hasLoadedOnce) {
        this.hasLoadedOnce = true;
      }

      for (const newItem of newItems) {

        this.searchComponents.push(newItem)
      }
    } else if (this.state.isLoading && !lastModelIsLoad) {
      this.searchComponents.push({
        "Model": "load"
      })
    }

    this.state.data = [];

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Catalogue </Text>
        <FlatList
          contentContainerStyle = {this.baseStyle.list}
          onScroll = {(event) => this.handleScroll(event, this)}
          data = {this.searchComponents}

          renderItem = {({item}) => {
            return (item.Model == "load") ? this.loadingIcon() :
            <ImageTitre
            big
            title = {item.ShownName}
            imageSource = {{uri:item["Photo extérieur"]}}
            />
          }}

          keyExtractor = {item => item.Model}
        />

      </View>
    )
  }
};
