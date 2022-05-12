import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Pressable, TextInput, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import CustomList from './CustomList.js';

export default class SearchList extends CustomList {


  /**
   * Construit la liste de recherche.
   *
   * @param  {Object} props Les propriétés de la liste.
   */
  constructor(props) {
    super(props);

    this.lastResult = null;
    this.filters = null
  }


  /**
   * Le chargement de la liste.
   *
   * @async
   * @return {Object} Les données obtenues durant le chargement.
   */
  async load() {

    if (!this.canSearch || this.searchText != null){
      let dataFound;

      if (this.canSearch) {

        if (this.filters && this.filters.length == 0) {
          this.filters = null;
        }

        let apiData = await ApiCommunicator.openSearch(this.searchText, this.filters);

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
