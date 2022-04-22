import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default class BoutonImageTitre extends Component {

  constructor(props) {
    super(props);

    this.placeHolderText = "Texte"
    this.placeHolderImage = {uri : 'https://c.tenor.com/-O0Xii3GomgAAAAM/pug-dance.gif'}
    let color = props.color ? props.color : "orange";

    this.baseStyle = StyleSheet.create({
        text: {
          marginTop: 16,
          textAlign: "center",
          fontSize: 12,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
          },
        button : {
          width: 175,
          margin : 10,
          marginTop: 10,
          marginBottom: 10,
          alignItems : 'center',
          textAlignVertical : 'center',
          paddingBottom: 20,
          paddingTop : 15,
          paddingHorizontal: 50,
          borderColor: "transparent",
          borderRadius: 12,
          backgroundColor : color
        },

      tinyLogo: {
          width: 50,
          height: 50,
      },
    });
  }
  //À noter : à chaque fois que la classe change, cette fonction est appelée
  //Montre la page

  test() {
    console.log("?")
  }

  render() {

    let buttonStyle =
      (this.props.buttonStyle) ? this.props.buttonStyle : this.baseStyle.button;
    let pageFunction =
      (this.props.pageFunction) ? this.props.pageFunction : this.test;
    let textStyle =
      (this.props.textStyle) ? this.props.textStyle : this.baseStyle.text;
    let imageSource =
      (this.props.imageSource) ? this.props.imageSource : this.placeHolderImage;
    let title =
      (this.props.title) ? this.props.title : this.placeHolderText;
    let imageStyle =
      (this.props.imageStyle) ? this.props.imageStyle : this.baseStyle.tinyLogo;

    return (
      <Pressable style = {buttonStyle} onPress = {pageFunction}>
        <Image
          style = {imageStyle}
          source = {imageSource}
          />
          <Text style = {textStyle}>{title}</Text>
      </Pressable>
    )
  };
};