import React, { Component } from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';

const image = { uri: "https://photo-voiture.motorlegend.com/hd/dodge-zeo-concept-45328.jpg" };

class MainMenu extends Component {
  render() {
    return (
      <View>
      <ImageBackground source={image} resizeMode="cover" style= {{width : 1920, height : 1080 }}>
      <Text style = {styles.text} >Bienvenue dans l'encyclopedie automobile !</Text>
    </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "regular",
    textAlign: "center",
    textAlignVertical : "bottom",  
  }
});

export default MainMenu;
