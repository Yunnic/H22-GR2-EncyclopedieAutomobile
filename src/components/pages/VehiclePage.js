import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import ApiCommunicator from '../../api/ApiCommunicator.js';

export default class VehiclePage extends LoadableComponent {

  /**
   * Construction de la page d'automobiles'.
   *
   * @param {Object} props Les propriétés de la page.
   */
  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flexGrow : 1,
            alignItems : 'center',
            justifyContent : 'flex-start',
            paddingTop : 75,
            paddingBottom : 30,
            padding : 30
        },
    });

    this.vehicle = null;
  }

  /**
   * Charge la page d'automobile.
   *
   * @async
   * @return {Object}  Les données obtenues lors du chargement qui sont retournées.
   */
  async load() {
    const {brand, model} = this.props.route.params;
    this.vehicle = await ApiCommunicator.getCar(brand, model);

    if (this.vehicle == null) {
      this.errorHandler("Automobile n'a pas été trouvé !");
    }

    return null;
  }

  /**
   * L'affichage de la page lorsqu'elle est chargée.
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui sont affichés.
   */
  loadedView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        {this.vehicle.render()}
      </ScrollView>
    )
  }
};
