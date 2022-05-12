import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import LoadableComponent from './LoadableComponent.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FavoriteButton extends LoadableComponent {


  /**
   * Construit un bouton qui s'occupe de la liste des favoris.
   *
   * @param {Object} props Les propriétés du bouton.
   */
  constructor(props) {
    super(props);

    this.brand = props.brand;
    this.model = props.model;
    this.imageOn = require("../../images/StarFilled.png");
    this.imageOff = require("../../images/StarEmpty.png");
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
    })
  }


  /**
   * Ajoute une automobile dans la liste de favoris.
   *
   * @async
   */
  async add() {
    try {
      let fav = await AsyncStorage.getItem('favorite');

      if (fav == null) {
        fav = {};
      } else {
        fav = JSON.parse(fav);
      }

      if (fav[this.brand] == null) {
        fav[this.brand] = {};
      }

      fav[this.brand][this.model] = true;

      await AsyncStorage.setItem('favorite', JSON.stringify(fav));

    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Enlève une automobile de la liste de favoris.
   *
   * @async
   */
  async remove() {
    try {
      let fav = await AsyncStorage.getItem('favorite');

      if (fav != null) {
        fav = JSON.parse(fav);
        if (fav[this.brand] != null && fav[this.brand][this.model] != null) {
          delete fav[this.brand][this.model];

          if (fav[this.brand].length == 0) {
            delete fav[this.brand];
          }

          await AsyncStorage.setItem('favorite', JSON.stringify(fav));
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Vérifie si le bouton est déjà activé.
   *
   * @return {bool} Si le bouton est activé.
   */
  async getOnState() {
    try {
      let fav = await AsyncStorage.getItem('favorite');
      console.log(fav);
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
   * Charge le bouton de favoris
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
   * Affice le bouton lorsqu'il est chargé
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui seront affichés.
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
