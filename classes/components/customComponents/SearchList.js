import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from './LoadableComponent.js';
import ImageTitre from './ImageTitre.js';
import LoadingIcon from './LoadingIcon.js';

export default class SearchList extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        list : {
          padding : 20,
          paddingBottom: 105,
          flexGrow : 1,
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor : "#4d4d4d",
        },
    });

    this.searchComponents = [];
    this.lastResult = null;
    this.hasLoadedOnce = false;

    this.buttonFunction = null;
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

    return newData;
  }

  handleScroll(event, component) {
    const scrollHeight = event.nativeEvent.contentOffset.y;
    const screenHeight = event.nativeEvent.contentSize.height;
    const screenCurrentHeight = event.nativeEvent.layoutMeasurement.height;
    if (component.lastResult && !component.state.isLoading && scrollHeight + screenCurrentHeight + 20 > screenHeight) {
      component.reloadWithoutLoading();
    }
  }

  loadedView(data) {
    let count = this.searchComponents.length;
    let searchData = data.searchData
    let newItems = (searchData) ? data.searchData.Items : null;
    const lastModelIsLoad = count > 0 && this.searchComponents[count-1].Model == "load";
    const buttonFunction = this.props.buttonFunction;

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
      <FlatList
        contentContainerStyle = {this.baseStyle.list}
        onScroll = {(event) => this.handleScroll(event, this)}
        data = {this.searchComponents}

        renderItem = {({item}) => {
          return (item.Model == "load") ? <LoadingIcon/> :
          <ImageTitre
          big
          title = {item.ShownName}
          imageSource = {{uri:item["Photo extérieur"]}}
          pageFunction = {() => buttonFunction(item)}
          />
        }}

        keyExtractor = {item => item.Model}
      />
    )
  }
};
