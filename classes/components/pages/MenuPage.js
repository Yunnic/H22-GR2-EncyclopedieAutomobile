import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable } from 'react-native';
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
        },
        title: {
          marginTop: 16,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          lineHeight: 20,
          textAlignVertical: "center",
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
            borderColor: "#20232a",
            borderRadius: 12,
            backgroundColor: "#61dafb",
            color: "#20232a"
        }
    
    });
  }

  /*async load() {
    const newData = await ApiCommunicator.getCar("bmw", "m240i g42");
    this.loadPage(newData);
  }*/

  loadedPageView(data) {
    return(
      <View style = {this.baseStyle.container}>
        <Text title = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <Pressable style = {this.baseStyle.button} onPress = {()=> console.log("a")}>
            <Text style = {this.baseStyle.title}>Allo</Text>
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
