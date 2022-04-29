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
      const prjExpr = "ShownName, #pe, Brand, Model, #sn";
      const exprAttNames = {
        "#pe": "Photo extérieur",
        "#sn": "SearchName",
      }

      let filtExpr;
      let exprAttVal;

      if (this.canSearch) {
        exprAttVal = { ":snText": this.searchText };
        filtExpr = "contains(#sn, :snText)";
      } else {
        filtExpr = null;
        exprAttVal = null;
      }

      const dataFound = await ApiCommunicator.searchModels(prjExpr, filtExpr, exprAttNames, exprAttVal, this.lastResult);

      this.lastResult = dataFound.LastEvaluatedKey;
      this.hasMoreResults = dataFound.LastEvaluatedKey != null;

      const newData = {
        "dataFound": dataFound
      };

      return newData;
    } else {
      return [];
    }
  }
};
