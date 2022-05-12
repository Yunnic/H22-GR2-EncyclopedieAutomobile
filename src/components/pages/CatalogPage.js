import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import LoadingIcon from '../customComponents/LoadingIcon.js';
import SearchList from '../customComponents/SearchList.js';

export default class CatalogPage extends LoadableComponent {


  /**
   * Construction de la page catalogue.
   *
   * @param {Object} props Les propriétés de la page.
   */
  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
          padding : 20,
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
   * Affiche la page lorsqu'elle est chargée.
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui seront affichés.
   */
  loadedView(data) {

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Catalogue </Text>
        <SearchList
          buttonFunction = {(info) => this.navigate('Vehicle', {
              "brand": info.Brand,
              "model": info.Model
          })}
        />
      </View>
    )
  }
};
