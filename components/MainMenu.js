import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class MainMenu extends Component {
  render() {
    return (
      <Text Bienvenue dans l'encyclopedie automobile />
      <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 200, height: 200 }}
        />
    );
  }
}

export default MainMenu;
