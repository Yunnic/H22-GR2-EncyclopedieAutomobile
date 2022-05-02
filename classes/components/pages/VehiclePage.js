import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import ApiCommunicator from '../../api/ApiCommunicator.js';

export default class VehiclePage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flexGrow : 1,
            alignItems : 'center',
            justifyContent : 'flex-start',
            paddingTop : 75,
            paddingBottom : 30,
            padding : 15
        },
    });

    this.vehicle = null;
  }

  async load() {
    const {brand, model} = this.props.route.params;
    this.vehicle = await ApiCommunicator.getCar(brand, model);

    if (this.vehicle == null) {
      this.errorHandler("Automobile n'a pas été trouvé !");
    }

    return null;
  }

  loadedView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        {this.vehicle.render()}
      </ScrollView>
    )
  }
};
