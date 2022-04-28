import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import LoadableComponent from './LoadableComponent.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FavoriteButton extends LoadableComponent {

  constructor(props) {
    super(props);

    this.brand = props.brand;
    this.model = props.model;
    this.imageOn = {uri : "https://cdn-icons-png.flaticon.com/512/20/20626.png"};
    this.imageOff = {uri : "https://cdn0.iconfinder.com/data/icons/thin-voting-awards/57/thin-231_star_favorite-512.png"};
    this.isOn = false;
    this.change = false;
    this.hasLoadedOnce = false;

    this.baseStyle = StyleSheet.create({
      container: {
        flex : 1,
      },
      logo: {
        width: 100,
        height: 100,
        borderRadius: 5,
      },
    })
  }

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

  async remove() {
    try {
      let fav = await AsyncStorage.getItem('favorite');

      if (fav != null) {
        fav = JSON.parse(fav);
        if (fav[this.brand] != null && fav[this.brand][this.model] != null) {
          delete fav[this.brand][this.model];
          await AsyncStorage.setItem('favorite', JSON.stringify(fav));
          console.log("delete");
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


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

  onClick(button) {
    button.change = true;

    button.reloadWithoutLoading()
  }

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  //Montre la page
  loadedView(data) {

    const image = (this.isOn) ? this.imageOn : this.imageOff;

    return (
      <Pressable
      style = {this.baseStyle.container}
      onPress = {() => this.onClick(this)}>
        <Image
          style = {this.baseStyle.logo}
          source = {image}
        />
      </Pressable>
    )
  }
};
