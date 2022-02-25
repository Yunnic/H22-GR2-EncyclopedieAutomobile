import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';

const image = { uri: "https://photo-voiture.motorlegend.com/hd/dodge-zeo-concept-45328.jpg" };

class MainMenu extends Component {
  render() {
    return (
      <View>
        <ImageBackgorund source = {image} resizeMode="cover" style={styles.image}>
        <Text style={{textAlign: 'center'}}> Bienvenue dans l'encyclopedie automobile </Text>
        </ImageBackground>
      </View>
    );
  }
}

export default MainMenu;
