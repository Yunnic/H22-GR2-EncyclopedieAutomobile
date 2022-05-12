import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';

export default class ErrorPage extends LoadableComponent {


  /**
   * Construction de la page d'erreur.
   *
   * @param {Object} props Les propriétés de la page.
   */
  constructor(props) {
    super(props);

    this.goToError = false;

    this.errorStyle = StyleSheet.create({
      text: {
        color: 'red'
      }
    });
  }


  /**
   * L'affichage de la page lorsqu'elle est chargée.
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui sont affichés.
   */
  loadedView(data) {
    const route = this.props.route;
    const {catchedError} = route.params;
    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.errorStyle.text}>{"ERREUR : " + catchedError}</Text>
        <Button
          style = {this.errorStyle.text}
          title = "Retourner à la page principale"

          // Navigue à p.1
          onPress={() => this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Menu'}]
          })}
        />
      </View>
    )
  }
};
