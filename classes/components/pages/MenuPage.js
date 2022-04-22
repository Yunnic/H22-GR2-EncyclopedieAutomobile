import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import BoutonImageTitre from '../customComponents/BoutonImageTitre.js';

export default class TestPage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
      container : {
        flexGrow : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : "#4d4d4d",
      },
      horizontal : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : "#4d4d4d",
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
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <View style = {this.baseStyle.horizontal}>
          <BoutonImageTitre
          pageFunction = {() => this.props.navigation.navigate("Recherche")}
          title = "Recherche"
          imageSource = {{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/500px-Search_Icon.svg.png'}}
          />

          <BoutonImageTitre
          pageFunction = {() => this.props.navigation.navigate("Catalogue")}
          color = "darkred"
          title = "Catalogue"
          imageSource = {{uri : 'https://static.thenounproject.com/png/29432-200.png'}}
          />

        </View>

        <View style = {this.baseStyle.horizontal}>

            <BoutonImageTitre
            pageFunction = {() => this.props.navigation.navigate("Page 1")}
            color = "green"
            title = "Favoris"
            imageSource = {{uri : 'https://cdn.pixabay.com/photo/2016/12/18/11/01/star-1915448_1280.png'}}
            />

            <BoutonImageTitre
            pageFunction = {() => this.props.navigation.navigate("Auteurs")}
            color = "purple"
            title = "Auteurs"
            imageSource = {{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Noun_Project_author_icon_1642368_cc.svg/875px-Noun_Project_author_icon_1642368_cc.svg.png'}}
            />

        </View>
      </ScrollView>
    )
  }
};
