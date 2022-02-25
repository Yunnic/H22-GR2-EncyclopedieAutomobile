import React, { Component } from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';

const image = { uri: "https://photo-voiture.motorlegend.com/hd/dodge-zeo-concept-45328.jpg" };

class MainMenu extends Component {
  render() {
    return (
      <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
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
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default MainMenu;
