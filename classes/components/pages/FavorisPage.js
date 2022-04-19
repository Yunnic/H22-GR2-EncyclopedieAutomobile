import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import Page from './Page.js';

export default class TestPage extends Page {

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
          marginBottom: 16,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },
        subtitle: {
          marginTop: 40,
          marginBottom: 16,
          textAlign: "center",
          fontSize: 25,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },
        text: {
          marginTop: 16,
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },

    tinyLogo: {
        width: 50,
        height: 50,
    },
    });
  }

  loadedPageView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Favoris </Text>

        <View style = {this.baseStyle.horizontal}>

        </View>

      </ScrollView>
    )
  }
};
