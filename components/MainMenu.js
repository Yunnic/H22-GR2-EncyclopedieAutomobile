import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class MainMenu extends Component {
  render() {
    return (
      <View>
        <Text> Bienvenue dans lencyclopedie automobile
        </Text>
        <Image>
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 200, height: 200 }}
        </Image>
      </View>
    );
  }
}

export default MainMenu;
