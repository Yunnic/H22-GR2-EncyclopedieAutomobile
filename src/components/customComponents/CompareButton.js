import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import LoadableComponent from './LoadableComponent.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CompareButton extends LoadableComponent {


  /**
   * Création du bouton de comparaison.
   *
   * @param  {Object} props Les propriétés choisies du bouton.
   */
  constructor(props) {
    super(props);

    this.brand = props.brand;
    this.model = props.model;
    this.imageOn = require("../../images/CompareCheckmark.png");
    this.imageOff = require("../../images/Compare.png");
    this.isOn = false;
    this.change = false;
    this.hasLoadedOnce = false;

    this.baseStyle = StyleSheet.create({
      container: {
        width: 100,
        height: 100,
      },
      logo: {
        width: 100,
        height: 100,
        borderRadius: 5,
      },
    });
  }


  /**
   * Ajoute une automobile dans la liste de comparaison.
   *
   * @async
   */
  async add() {
    try {
      let fav = await AsyncStorage.getItem('compare');

      if (fav == null) {
        fav = {};
      } else {
        fav = JSON.parse(fav);
      }

      if (fav.length == null) {
        fav.length = 0;
      }

      if (fav[this.brand] == null) {
        fav[this.brand] = {};
      }

      fav[this.brand][this.model] = true;

      fav.length++;

      await AsyncStorage.setItem('compare', JSON.stringify(fav));

    } catch (error) {
      console.log(error);
    }
  }



  /**
   * Enlève une automobile de la liste de comparaison.
   *
   * @async
   */
  async remove() {
    try {
      let fav = await AsyncStorage.getItem('compare');

      if (fav != null) {
        fav = JSON.parse(fav);
        if (fav[this.brand] != null && fav[this.brand][this.model] != null) {
          delete fav[this.brand][this.model];

          if (fav[this.brand].length == 0) {
            delete fav[this.brand];
          }

          fav.length--;

          await AsyncStorage.setItem('compare', JSON.stringify(fav));
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Vérifie si le bouton est déjà activé.
   *
   * @async
   * @return {bool}  Retourne si le bouton est activé.
   */
  async getOnState() {
    try {
      let fav = await AsyncStorage.getItem('compare');
      if (fav != null) {
        fav = JSON.parse(fav);
        return fav[this.brand] != null && fav[this.brand][this.model] != null;
      }

      return false;

    } catch (error) {
      console.log(error);
    }
  }



  /**
   * Charge le bouton de comparaison
   *
   * @async
   * @return {Array}  Retourne les données chargées à donner (rien)
   */
  async load() {

    if (this.change) {
      this.isOn = !this.isOn;

      if (this.isOn) {
        this.add();
      } else {
        this.remove();
      }
    } else if (!this.hasLoadedOnce) {
      this.isOn = await this.getOnState();
    }

    return [];
  }




  /**
   * Gère ce qui arrive après un clic.
   */
  onClick() {
    this.change = true;

    this.reload(false);
  }


  /**
   * Gère la manière dont la page est affichée lorsqu'elle est chargée.
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui seront affichés à l'écran.
   */
  loadedView(data) {

    const image = (this.isOn) ? this.imageOn : this.imageOff;

    return (
      <Pressable
      style = {this.baseStyle.container}
      onPress = {() => this.onClick()}>
        <Image
          style = {this.baseStyle.logo}
          source = {image}
        />
      </Pressable>
    )
  }
};
