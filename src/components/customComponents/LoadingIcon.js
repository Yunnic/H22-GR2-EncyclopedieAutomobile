import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default class LoadingIcon extends Component {

  /**
   * Constuit l'icone de chargement.
   *
   * @param  {Object} props Les propriétés de l'icone.
   */
  constructor(props) {
    super(props);
  }


  /**
   * Affiche l'icone de chargement
   *
   * @return {Object} Les components affichés à l'écran.
   */
  render() {
    return (
      <ActivityIndicator size="large" color="white"/>
    );
  };
};
