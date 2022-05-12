import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default class CustomListButton extends Component {


  /**
   * Construit un bouton pour la liste d'automobiles.
   *
   * @param  {Object} props Les propriétés du bouton.
   */
  constructor(props) {
    super(props);

    this.placeHolderText = "Texte"
    this.placeHolderImage = {uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/638px-Placeholder_view_vector.svg.png"}
    this.baseStyle = StyleSheet.create({
      container: {
        alignItems: 'center',
        padding: 20
      },
      tinyLogo: {
        width: 150,
        height: 50,
        borderRadius: 2.5,
      },
      logo: {
        width: 300,
        height: 100,
        borderRadius: 5,
      },
      text: {
        fontSize : 20,
        fontWeight : 'bold',
        color: 'white'
      }
    })
  }


  /**
   * Affiche le bouton à l'écran.
   *
   * @return {Object} Les components qui seront affichés.
   */
  render() {

    let viewStyle =
      (this.props.viewStyle) ? this.props.viewStyle : this.baseStyle.container;
    let textStyle =
      (this.props.textStyle) ? this.props.textStyle : this.baseStyle.text;
    let imageSource =
      (this.props.imageSource) ? this.props.imageSource : this.placeHolderImage;
    let title =
      (this.props.title) ? this.props.title : this.placeHolderText;
    let pageFunction = this.props.pageFunction;

    let imageStyle = this.baseStyle.tinyLogo;

    if (this.props.imageStyle) {
      imageStyle = this.props.imageStyle;
    } else if (this.props.big) {
      imageStyle = this.baseStyle.logo;
    }

    return (
      <Pressable
      style = {viewStyle}
      onPress = {() => {
        if (pageFunction) {
          pageFunction();
        }
      }}>
        <Image
          style = {imageStyle}
          source = {imageSource}
        />
        <Text style = {textStyle}> {title} </Text>
      </Pressable>
    )
  }
};
