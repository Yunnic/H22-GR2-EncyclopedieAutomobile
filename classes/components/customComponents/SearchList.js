import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, TextInput, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import CustomList from './CustomList.js';

export default class SearchList extends CustomList {

  constructor(props) {
    super(props);

    this.lastResult = null;
  }

  async load() {

    if (!this.canSearch || this.searchText != null){
      let dataFound;

      if (this.canSearch) {
        console.log(this.props.filters);
        //test pour l'instant
        let filterTest = [
          {
            "term" : {
              "Brand.keyword" : "bmw"
            }
          },

          {
            "term" : {
              "Brakes.Type.keyword" : "Conventionnel / Carbone céramique"
            }
          }
        ]
        //let apiData = await ApiCommunicator.openSearch(this.searchText, filterTest);
        let apiData = await ApiCommunicator.openSearch(this.searchText);

        //J'ai codé ce système avant d'utiliser OpenSearch, je dois donc restructurer les données
        dataFound = {
          "Count" : apiData.hits.total.value,
          "Items" : []
        }

        for (const item of apiData.hits.hits) {
          dataFound.Items.push(item["_source"]);
        }

        //this.lastResult = dataFound.LastEvaluatedKey;
        //this.hasMoreResults = dataFound.LastEvaluatedKey != null;
        this.hasMoreResults = false;

      } else {
        const prjExpr = "ShownName, #pe, Brand, Model, #sn";
        const exprAttNames = {
          "#pe": "Photo extérieur",
          "#sn": "SearchName",
        }

        dataFound = await ApiCommunicator.searchModels(prjExpr, null, exprAttNames, null, this.lastResult);

        this.lastResult = dataFound.LastEvaluatedKey;
        this.hasMoreResults = dataFound.LastEvaluatedKey != null;
      }

      const newData = {
        "dataFound": dataFound
      };

      return newData;
    } else {
      return [];
    }
  }
};
