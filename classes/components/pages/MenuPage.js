import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import Page from './Page.js';

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
            paddingVertical: 25,
            paddingHorizontal : 25,
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
            margin : 50,
            marginTop: 10,
            marginBottom: 10,
            alignItems : 'center',
            textAlignVertical : 'center',
            paddingBottom: 20,
            paddingTop : 15,
            paddingHorizontal: 50,
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
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Encyclopedie Automobile </Text>
        <View style = {this.baseStyle.horizontal}>
          <Pressable style = {this.baseStyle.button} onPress = {() => this.props.navigation.navigate("Page 1")}>
            <Image
              style = {this.baseStyle.tinyLogo}
              source = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
              />
              <Text style = {this.baseStyle.text}>Favoris</Text>
          </Pressable>
          
          <Pressable style = {this.baseStyle.button} onPress = {() => this.props.navigation.navigate("Page 1")}>
            <Image
              style = {this.baseStyle.tinyLogo}
              source = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
              />
              <Text style = {this.baseStyle.text}>Favoris</Text>
          </Pressable>
        </View>

        <Pressable style = {this.baseStyle.button} onPress = {() => this.props.navigation.navigate("Page 1")}>
        <Image
            style = {this.baseStyle.tinyLogo}
            source = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
            />
            <Text style = {this.baseStyle.text}>Favoris</Text>
        </Pressable>

        <Pressable style = {this.baseStyle.button} onPress = {() => this.props.navigation.navigate("Page 1")}>
        <Image
            style = {this.baseStyle.tinyLogo}
            source = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
            />
            <Text style = {this.baseStyle.text}>Favoris</Text>
        </Pressable>

        <Pressable style = {this.baseStyle.button} onPress = {() => this.props.navigation.navigate("Page 1")}>
        <Image
            style = {this.baseStyle.tinyLogo}
            source = {{uri : 'https://www.freeiconspng.com/uploads/favorites-star-icon-png-0.png'}}
            />
            <Text style = {this.baseStyle.text}>Favoris</Text>
        </Pressable>


      </View>
    )
  }
};
