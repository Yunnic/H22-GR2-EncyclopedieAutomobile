import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import MenuButton from '../customComponents/MenuButton.js';

export default class MenuPage extends LoadableComponent {

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

  loadedView(data) {
    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <View style = {this.baseStyle.horizontal}>
          <MenuButton
            pageFunction = {() => this.navigate("Search")}
            title = "Recherche"
            imageSource = {{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/500px-Search_Icon.svg.png'}}
          />

          <MenuButton
            pageFunction = {() => this.navigate("Catalog")}
            color = "darkred"
            title = "Catalogue"
            imageSource = {{uri : 'https://static.thenounproject.com/png/29432-200.png'}}
          />

        </View>

        <View style = {this.baseStyle.horizontal}>

          <MenuButton
            pageFunction = {() => this.navigate("Favorite")}
            color = "green"
            title = "Favoris"
            imageSource = {{uri : 'https://cdn.pixabay.com/photo/2016/12/18/11/01/star-1915448_1280.png'}}
          />

          <MenuButton
            pageFunction = {() => this.navigate("Authors")}
            color = "purple"
            title = "Auteurs"
            imageSource = {{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Noun_Project_author_icon_1642368_cc.svg/875px-Noun_Project_author_icon_1642368_cc.svg.png'}}
          />

        </View>

        <View style = {this.baseStyle.horizontal}>

          <MenuButton
            pageFunction = {() => this.navigate("Compare")}
            color = "blue"
            title = "Comparaison"
            imageSource = {{uri : 'https://cdn.pixabay.com/photo/2017/04/20/22/11/scale-2247167_1280.png'}}
          />

        </View>
      </View>
    )
  }
};
