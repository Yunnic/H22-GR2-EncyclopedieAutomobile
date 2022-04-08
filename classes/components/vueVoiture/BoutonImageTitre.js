import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default class imageTitre extends Component {

  constructor(props) {
    super(props);

    this.placeHolderText = "Texte"
    this.placeHolderImage = {uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/638px-Placeholder_view_vector.svg.png"}
    this.baseStyle = StyleSheet.create({
        container : {
            flexGrow : 1,
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : "#4d4d4d",
        },
        horizontal : {
          flexDirection : 'row',
          alignItems : 'center',
          backgroundColor : "#4d4d4d",
        },
        title: {
          marginTop: 16,
          marginBottom: 160,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },
        text: {
            marginTop: 16,
            textAlign: "center",
            fontSize: 12,
            fontWeight: "bold",
            textAlignVertical: "center",
            color : "white",
          },
        buttonFavoris : {
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
            backgroundColor: "green",
        },

        buttonRecherche : {
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
            backgroundColor: "orange",
        },

        buttonCatalogue : {
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
          backgroundColor: "darkred",
      },

      buttonAuteurs : {
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
        backgroundColor: "purple",
    },

    tinyLogo: {
        width: 50,
        height: 50,
    },
    });
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
      imageStyle = this.props.imageStyle;
    } else if (this.props.big) {
      imageStyle = this.baseStyle.logo;
    }

    return (
      <Pressable style = {this.baseStyle.buttonRecherche} onPress = {() => this.props.navigation.navigate("Page 1")}>
        <Image
          style = {this.baseStyle.tinyLogo}
          source = {{uri : 'https://c.tenor.com/-O0Xii3GomgAAAAM/pug-dance.gif'}}
          />
          <Text style = {this.baseStyle.text}>Recherche</Text>
      </Pressable>
    )
  };
};
