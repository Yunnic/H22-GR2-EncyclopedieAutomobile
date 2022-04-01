import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

export default class imageTitre extends Component {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
      container: {
        flex: 1,
        marginHorizontal: 16,
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      logo: {
        width: 66,
        height: 58,
      },
    })
  }

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  //Montre la page
  render() {
    return (
      <View style = {this.baseStyle.container}>
        <Image
          style = {this.baseStyle.logo}
          source = {{uri: "https://www.4dface.io/wp-content/uploads/2018/10/4DFM_sample2.jpg"}}
        />
        <Text>a</Text>
      </View>
    )
  }
};
