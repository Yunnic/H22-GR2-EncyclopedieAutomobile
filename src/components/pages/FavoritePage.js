import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import FavoriteList from '../customComponents/FavoriteList.js';

export default class FavoritePage extends LoadableComponent {

  /**
   * Construction de la page de favoris.
   *
   * @param {Object} props Les propriétés de la page.
   */
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

  /**
   * L'affichage de la page lorsqu'elle est chargée.
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui sont affichés.
   */
  loadedView(data) {

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Liste de favoris </Text>
        <FavoriteList
          buttonFunction = {(info) => this.navigate('Vehicle', {
              "brand": info.Brand,
              "model": info.Model
          })}
          canSearch = {false}
        />
      </View>
    )
  }
};
