import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, TextInput, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from './LoadableComponent.js';
import CustomListButton from './CustomListButton.js';
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
      },
      horizontal : {
        flexDirection : 'row',
        alignItems : 'center',
      },
      input: {
        height: 40,
        width: 225,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color : "white",
        backgroundColor : "rgba(225,225,225,.25)",
        borderRadius : 15,
      },
      filtersButton: {
        height: 40,
        width: 120,
        borderWidth: 1,
        color : "white",
        backgroundColor : "rgba(125,125,125,.25)",
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
      },
      text : {
        fontSize : 15,
        color: "white",
        padding : 4
      }
    });

    this.listComponents = [];

    this.buttonFunction = null;
    this.canSearch = props.canSearch;
    this.canUseFilters = props.canUseFilters;
    this.searchText = null;
    this.hasMoreResults = false;
  }

  handleScroll(event, component) {
    const scrollHeight = event.nativeEvent.contentOffset.y;
    const screenHeight = event.nativeEvent.contentSize.height;
    const screenCurrentHeight = event.nativeEvent.layoutMeasurement.height;
    if (component.hasMoreResults && !component.state.isLoading && scrollHeight + screenCurrentHeight + 20 > screenHeight) {
      component.reload(false);
    }
  }

  onSubmit(text, list) {
    list.searchText = text;
    this.listComponents = [];
    list.reload(true);
  }

  componentDidUpdate() {
    if (this.hasMoreResults && !this.state.isLoading && this.listComponents.length < 8) {
      this.reload(false);
    }
  }

  loadedView(data) {
    let count = this.listComponents.length;
    let dataFound = data.dataFound
    let newItems = (dataFound) ? data.dataFound.Items : null;
    const lastModelIsLoad = count > 0 && this.listComponents[count-1].Model == "load";
    const buttonFunction = this.props.buttonFunction;
    const filterFunction = this.props.filterFunction;

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
          ? <View style = {this.baseStyle.horizontal}>
            <TextInput style = {this.baseStyle.input} onSubmitEditing={(event) => this.onSubmit(event.nativeEvent.text.toLowerCase(), this)}/>
            {(this.canUseFilters) ? <Pressable
            style = {this.baseStyle.filtersButton}
            onPress = {() => filterFunction(this)}>
              <Text style = {this.baseStyle.text}> Filtres </Text>
            </Pressable>
          :null}

          </View>
          : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle = {this.baseStyle.list}
          onScroll = {(event) => this.handleScroll(event, this)}
          data = {this.listComponents}

          renderItem = {({item}) => {
            return (item.Model == "load") ? <LoadingIcon/> :
            <CustomListButton
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
