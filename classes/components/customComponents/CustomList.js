import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, TextInput, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from './LoadableComponent.js';
import ImageTitre from './ImageTitre.js';
import LoadingIcon from './LoadingIcon.js';

export default class CustomList extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
      list : {
        paddingBottom: 105,
        flexGrow : 1,
        alignItems : 'center',
        justifyContent : 'flex-start',
        backgroundColor : "#4d4d4d",
      },
      input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor : "#5f5f5f",
        color : "white",
        borderRadius : 15,
      },
    });

    this.listComponents = [];

    this.buttonFunction = null;
    this.canSearch = props.canSearch;
    this.searchText = null;
    this.hasMoreResults = false;
  }

  handleScroll(event, component) {
    const scrollHeight = event.nativeEvent.contentOffset.y;
    const screenHeight = event.nativeEvent.contentSize.height;
    const screenCurrentHeight = event.nativeEvent.layoutMeasurement.height;
    if (component.hasMoreResults && !component.state.isLoading && scrollHeight + screenCurrentHeight + 20 > screenHeight) {
      component.reloadWithoutLoading();
    }
  }

  onSubmit(text, list) {
    list.searchText = text;
    this.listComponents = [];
    list.reloadWithLoading();
  }

  componentDidUpdate() {
    if (this.hasMoreResults && !this.state.isLoading && this.listComponents.length < 8) {
      this.reloadWithoutLoading();
    }
  }

  loadedView(data) {
    let count = this.listComponents.length;
    let dataFound = data.dataFound
    let newItems = (dataFound) ? data.dataFound.Items : null;
    const lastModelIsLoad = count > 0 && this.listComponents[count-1].Model == "load";
    const buttonFunction = this.props.buttonFunction;

    if (newItems){
      if (lastModelIsLoad) {
        this.listComponents.pop();
      }

      for (const newItem of newItems) {

        this.listComponents.push(newItem)
      }
    } else if (this.state.isLoading && !lastModelIsLoad) {
      this.listComponents.push({
        "Model": "load"
      })
    }

    this.state.data = [];

    return(
      <View style = {this.baseStyle.list}>
        {(this.canSearch)
          ? <TextInput style = {this.baseStyle.input} onSubmitEditing={(event) => this.onSubmit(event.nativeEvent.text.toLowerCase(), this)}/>
          : null}
        <FlatList
          contentContainerStyle = {this.baseStyle.list}
          onScroll = {(event) => this.handleScroll(event, this)}
          data = {this.listComponents}

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
