import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class MainMenu extends Component {
  render() {
    return (
      <View>
        <Text> Bienvenue dans l'encyclopedie automobile </Text>
        <Image
          source={{
            uri: 'https://photo-voiture.motorlegend.com/hd/dodge-zeo-concept-45328.jpg',
          }}
          style={{ width: 1920, height: 1080 }}
        />
      </View>
    );
  }
}

export default MainMenu;
