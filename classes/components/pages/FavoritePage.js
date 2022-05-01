import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import FavoriteList from '../customComponents/FavoriteList.js';

export default class FavoritePage extends LoadableComponent {

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

  loadedView(data) {

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Liste de favoris </Text>
        <FavoriteList
          buttonFunction = {(info) => this.goToOtherPage(this, info)}
          canSearch = {false}
        />
      </View>
    )
  }
};
