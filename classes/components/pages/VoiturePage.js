import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import BoutonImageTitre from '../customComponents/BoutonImageTitre';
import ApiCommunicator from '../../api/ApiCommunicator.js';

export default class VoiturePage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flexGrow : 1,
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : "#4d4d4d",
        },
    });

    this.voiture = null;
  }

  async load() {
    const {brand, model} = this.props.route.params;
    this.voiture = await ApiCommunicator.getCar(brand, model);
    return null;
  }

  loadedView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        {this.voiture.affichageVoiture()}
        <BoutonImageTitre
            //pageFunction = {() => this.props.navigation.navigate("Page 1")}
            color = "green"
            title = "Favoris"
            imageSource = {{uri : 'https://cdn.pixabay.com/photo/2016/12/18/11/01/star-1915448_1280.png'}}
            />
      </ScrollView>
    )
  }
};
