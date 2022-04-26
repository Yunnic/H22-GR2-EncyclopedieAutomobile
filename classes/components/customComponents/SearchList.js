import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, TextInput, ScrollView, SafeAreaView} from 'react-native';
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
        paddingBottom: 105,
        alignItems : 'center',
        justifyContent : 'center',
        flexGrow : 1,
      },
      input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color : "white",
        borderRadius : 15,
      },
    });

    this.searchComponents = [];
    this.lastResult = null;
    this.hasLoadedOnce = false;

    this.buttonFunction = null;
    this.canSearch = props.canSearch;
    this.searchText = null;
  }

  async load() {

    if (!this.canSearch || this.searchText != null){
      const prjExpr2 = "ShownName, #pe, Brand, Model"
      const exprAttNames2 = {
        "#pe": "Photo extérieur"
      }

      const searchData = await ApiCommunicator.searchModels(prjExpr2, null, exprAttNames2, null, this.lastResult);
      const newData = {
        "searchData": searchData
      };

      return newData;
    } else {
      return [];
    }
  }

  handleScroll(event, component) {
    const scrollHeight = event.nativeEvent.contentOffset.y;
    const screenHeight = event.nativeEvent.contentSize.height;
    const screenCurrentHeight = event.nativeEvent.layoutMeasurement.height;
    if (component.lastResult && !component.state.isLoading && scrollHeight + screenCurrentHeight + 20 > screenHeight) {
      component.reloadWithoutLoading();
    }
  }

  onChangeText(text, list) {
    list.searchText = text;
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
      <View style = {this.baseStyle.list}>
        {(this.canSearch)
          ? <TextInput style = {this.baseStyle.input} onChangeText={(text) => this.onChangeText(text, this)}/>
          : null}
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
      </View>
    )
  }
};
