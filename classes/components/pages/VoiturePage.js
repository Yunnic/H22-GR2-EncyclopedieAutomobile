import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import ApiCommunicator from '../../api/ApiCommunicator.js';

export default class VoiturePage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flexGrow : 1,
            alignItems : 'center',
            justifyContent : 'center',
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
      </ScrollView>
    )
  }
};
