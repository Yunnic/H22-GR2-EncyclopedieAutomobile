import React from 'react';
import {StyleSheet, Text, ScrollView, View } from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiCommunicator from '../../api/ApiCommunicator.js';

export default class ComparePage extends LoadableComponent {

  /**
   * Construction de la page de comparaison.
   *
   * @param {Object} props Les propriétés de la page.
   */
  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flex : 1,
            padding : 16,
            paddingTop : 70,
            alignItems : 'center',
        },
        title: {
          marginTop: 16,
          marginBottom: 16,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },
        subtitle: {
          marginTop: 40,
          marginBottom: 16,
          textAlign: "center",
          fontSize: 25,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
        },
        text: {
            marginTop: 16,
            textAlign: "center",
            fontSize: 11,
            fontWeight: "bold",
            textAlignVertical: "center",
            color : "white",
        },
        head: { height: 40, backgroundColor: '#111161ef' },
        rowText: { margin: 6 },
        dataWrapper: { marginTop: -1 },
    });

    this.tableHead = [''];
    this.tableData = [];
    this.hasLoaded = false;
  }


  /**
   * Ajoute de l'information dans le tableau.
   *
   * @param  {Object} statInfo          Une liste d'information sur une caractéristique.
   * @param  {String} statValue         La valeur d'une caractéristique.
   * @param  {Number} validVehicleCount Le numéro de l'automobile lors du comptage.
   * @param  {Number} validStatCount    Le numéro du caractéristique lors du comptage.
   * @param  {String} prefix            Texte à ajouter devant la valeur.
   * @return {Number}                   Le nouveau numéro du caractéristique.
   */
  addDataToTable(statInfo, statValue, validVehicleCount, validStatCount, prefix) {
    if (prefix) {
      prefix = "(" + prefix + ") ";
    } else {
      prefix = "";
    }

    let frenchStatName = prefix + statInfo[0];
    let statTable = this.tableData[validStatCount];

    if (statTable && statTable[0] == frenchStatName) {
      if (statValue) {
        statTable.push(statValue);
      } else {
        statTable.push("");
      }
      validStatCount++;
    } else if (statValue) {
      let newRow = [frenchStatName]

      for (let i = 1; i < validVehicleCount; i++) {
        newRow.push("");
      }

      newRow.push(statValue);
      this.tableData.splice(validStatCount, 0, newRow)
      validStatCount++;
    }

    return validStatCount;
  }


  /**
   * Charge le tableau de comparaison.
   *
   * @async
   * @return {Object}  Les données obtenues lors du chargement qui sont retournées.
   */
  async load() {
    if (!this.hasLoaded) {
      try {
        let compareData = await AsyncStorage.getItem('compare');

        let validVehicleCount = 1; //Commence à un pour avoir un espace vide.

        if (compareData != null) {
          compareData = JSON.parse(compareData);
          for (const brand of Object.keys(compareData)) {
            for (const model of Object.keys(compareData[brand])) {
              let carFound = await ApiCommunicator.getCar(brand, model);

              if (carFound) {
                this.tableHead.push(carFound.caracteristiques.ShownName);

                let validStatCount = 0;
                //Pas la meilleure façon de le faire, mais ça fonctionne.
                for (const statInfo of carFound.shownStats) {
                  if (statInfo != null && statInfo.length > 1) {
                    let statValue = carFound.caracteristiques[statInfo[1]];

                    if (statInfo.length <= 2) {
                      validStatCount = this.addDataToTable(statInfo, statValue, validVehicleCount, validStatCount);
                    } else {
                      for (const subStatInfo of statInfo[2]) {
                        let subStatValue = (statValue) ? statValue[subStatInfo[1]] : null;
                        validStatCount = this.addDataToTable(subStatInfo, subStatValue, validVehicleCount, validStatCount, statInfo[0]);
                      }
                    }
                  }
                }
                validVehicleCount++;
              }
            }
          }
        }

      } catch (error) {
        console.log(error);
        this.errorHandler(error)
      }
    }

    return [];
  }


  //Tutoriel pour le tableau : https://www.npmjs.com/package/react-native-table-component

  /**
   * Affiche la page lorsqu'elle est chargée.
   *
   * @param  {Object} data Les données obtenues durant le chargement.
   * @return {Object}      Les components qui seront affichés.
   */
  loadedView(data) {
    let widthArr = [100]

    for (let i = 1; i < this.tableHead.length; i++) {
      widthArr.push(75)
    }

    return(
      <View style = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Comparaison </Text>
        {(this.tableData.length > 0) ?
          <ScrollView horizontal = {true}>
            <View>
              <ScrollView vertical = {true} >
                <Table borderStyle={{borderWidth: 1, borderColor: 'white'}}>
                  <Row data={this.tableHead} style={this.baseStyle.head} widthArr = {widthArr} textStyle = {{color: "white", fontSize: 9,}}/>
                  <Rows data={this.tableData} style = {{backgroundColor : '#0000009f'}} widthArr = {widthArr} textStyle = {{color: "white", fontSize: 9,}}/>
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        : <Text style = {{color: "white", fontSize: 16,}}> Vous n'avez pas encore ajouté de voitures!</Text>
        }
      </View>
    )
  }
};
