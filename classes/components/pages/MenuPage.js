import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';
import BoutonImageTitre from '..//vueVoiture/BoutonImageTitre.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);

  /*  const DATA = [
        {
          title: 'First Item',
          source: 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png',
        },
        {
          title: 'Second Item',
          source: 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png',
        },
        {
          title: 'Third Item',
          source: 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png',
        },
      ];
*/
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


  /*async load() {
    const newData = await ApiCommunicator.getCar("bmw", "m240i g42");
    this.loadPage(newData);

    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  }*/

  loadedPageView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <View style = {this.baseStyle.horizontal}>
          <BoutonImageTitre/>

          <BoutonImageTitre
          pageFunction = {() => this.props.navigation.navigate("Page 1")}
          color = "darkred"
          title = "Catalogue"
          />

        </View>

        <View style = {this.baseStyle.horizontal}>

            <BoutonImageTitre
            pageFunction = {() => this.props.navigation.navigate("Page 1")}
            color = "green"
            title = "Favoris"
            imageSource = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
            />

            <BoutonImageTitre
            pageFunction = {() => this.props.navigation.navigate("Page 1")}
            color = "purple"
            title = "Auteurs"
            />

        </View>
      </ScrollView>
    )
  }
};
