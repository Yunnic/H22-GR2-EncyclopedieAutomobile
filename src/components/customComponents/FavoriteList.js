import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, TextInput, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import CustomList from './CustomList.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FavoriteList extends CustomList {

  constructor(props) {
    super(props);

    this.allFavs = undefined;
    this.amountPerLoad = 10;
  }

  async load() {
    if (this.allFavs == undefined) {
      try {
        let fav = await AsyncStorage.getItem('favorite');

        let listFav = [];

        if (fav != null) {
          fav = JSON.parse(fav);
          for (const brand of Object.keys(fav)) {
            for (const model of Object.keys(fav[brand])) {
              listFav.push({"brand" : brand, "model" : model})
            }
          }
        }

        this.allFavs = listFav;

      } catch (error) {
        console.log(error);
        this.errorHandler(error)
      }
    }

    let counter = 0;
    let dataFound = [];

    if (this.allFavs.length > 0) {
      while (counter < this.amountPerLoad && this.allFavs.length > 0) {
        let carInfo = this.allFavs.pop()
        let carFound = await ApiCommunicator.getCar(carInfo.brand, carInfo.model);

        if (carFound) {
          let carData = carFound.caracteristiques;

          dataFound.push(carData);
        }
      }

      this.hasMoreResults = this.allFavs.length > 0;

      const newData = {
        "dataFound": {
          "Items" : dataFound
        }
      };

      return newData;
    }

    return [];
  }
};
