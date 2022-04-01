import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

export default class TestPage extends Page {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flex: 1,
            alignItems : 'center',
            justifyContent : 'center',
            paddingVertical: 25,
            paddingHorizontal : 25,
            backgroundColor : "#4d4d4d",
        },
        title: {
          marginTop: 16,
          marginBottom: 160,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          lineHeight: 20,
          textAlignVertical: "center",
          color : "white",
        },
        text: {
            marginTop: 16,
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            lineHeight: 20,
            textAlignVertical: "center",
            color : "white",
          },
        button : {
            marginTop: 10,
            marginBottom: 10,
            alignItems : 'center',
            textAlignVertical : 'center',
            paddingBottom: 20,
            paddingTop : 15,
            paddingHorizontal: 50,
            justifyContent : 'center',
            backgroundColor : "black",
            borderColor: "transparent",
            borderRadius: 12,
            backgroundColor: "green",
        },
        tinyLogo: {
            width: 50,
            height: 50,
          },
    });
  }

  /*async load() {
    const newData = await ApiCommunicator.getCar("bmw", "m240i g42");
    this.loadPage(newData);
  }*/

  loadedPageView(data) {
    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <Pressable style = {this.baseStyle.button} onPress = {()=> console.log("a")}>
        <Image
            style = {this.baseStyle.tinyLogo}
            source = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
            />
            <Text style = {this.baseStyle.text}>Favoris</Text>
        </Pressable>
        
        <Button
        style = {this.baseStyle.title}
        title="Aller page 1!"

        // Navigue à p.2
        onPress={() => this.props.navigation.navigate("Page 1")}
        />
      </View>
    )
  }
};
