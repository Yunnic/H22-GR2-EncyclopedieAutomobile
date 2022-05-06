import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import LoadingIcon from '../customComponents/LoadingIcon.js';
import SearchList from '../customComponents/SearchList.js';

export default class SearchPage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
          paddingTop : 20,
          paddingBottom : 20,
          flexGrow : 1,
          alignItems : 'center',
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
  }

  goToOtherPage(page, info) {
    page.props.navigation.navigate('Vehicle', {
        "brand": info.Brand,
        "model": info.Model
    });
  }

  goToFilters(page, searchList) {
    page.props.navigation.navigate('Authors');
  }

  loadedView(data) {

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Recherche </Text>
        <SearchList
          buttonFunction = {(info) => this.goToOtherPage(this, info)}
          filterFunction = {(searchList) => this.goToFilters(this, searchList)}
          canSearch = {true}
        />
      </View>
    )
  }
};
