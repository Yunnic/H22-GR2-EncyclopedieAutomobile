import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import MenuButton from '../customComponents/MenuButton.js';

export default class MenuPage extends LoadableComponent {

  /**
   * Construit la page du menu.
   *
   * @param {Object} props Les propriétés de la page.
   */
  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
      container : {
        flexGrow : 1,
        alignItems : 'center',
        justifyContent : 'center',
      },
      horizontal : {
        flexDirection : 'row',
        alignItems : 'center',
      },
      title: {
        marginTop: 16,
        marginBottom: 160,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        textAlignVertical: "center",
        color : "white",
      }
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
        <Text style = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <View style = {this.baseStyle.horizontal}>
          <MenuButton
            pageFunction = {() => this.navigate("Search")}
            title = "Recherche"
            imageSource = {require("../../images/Search.png")}
          />

          <MenuButton
            pageFunction = {() => this.navigate("Catalog")}
            title = "Catalogue"
            imageSource = {require("../../images/Catalog.png")}
          />

        </View>

        <View style = {this.baseStyle.horizontal}>

          <MenuButton
            pageFunction = {() => this.navigate("Favorite")}
            title = "Favoris"
            imageSource = {require("../../images/Favorite.png")}
          />

          <MenuButton
            pageFunction = {() => this.navigate("Authors")}
            title = "Auteurs"
            imageSource = {require("../../images/Authors.png")}
          />

        </View>

        <View style = {this.baseStyle.horizontal}>

          <MenuButton
            pageFunction = {() => this.navigate("Compare")}
            title = "Comparaison"
            imageSource = {require("../../images/Compare.png")}
          />
        </View>
      </View>
    )
  }
};
