import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

export default class imageTitre extends Component {

  constructor(props) {
    super(props);

    this.placeHolderText = "Texte"
    this.placeHolderImage = {uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/638px-Placeholder_view_vector.svg.png"}
    this.baseStyle = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center'
      },
      tinyLogo: {
        width: 75,
        height: 75,
        resizeMode: 'contain'
      },
      logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
      },
      text: {
      }
    })
  }

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  //Montre la page
  render() {

    let viewStyle =
      (this.props.viewStyle) ? this.props.viewStyle : this.baseStyle.container;
    let textStyle =
      (this.props.textStyle) ? this.props.textStyle : this.baseStyle.text;
    let imageSource =
      (this.props.imageSource) ? this.props.imageSource : this.placeHolderImage;
    let title =
      (this.props.title) ? this.props.title : this.placeHolderText;

    let imageStyle = this.baseStyle.tinyLogo;

    if (this.props.imageStyle) {
      imageStyle = this.props.viewStyle;
    } else if (this.props.big) {
      imageStyle = this.baseStyle.logo;
    }

    return (
      <View style = {viewStyle}>
        <Image
          style = {imageStyle}
          source = {imageSource}
        />
        <Text style = {textStyle}> {title} </Text>
      </View>
    )
  }
};
