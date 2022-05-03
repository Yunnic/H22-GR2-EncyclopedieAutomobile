import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';
import { getCurrentTimestamp } from 'react-native/Libraries/Utilities/createPerformanceLogger';
import FavoriteButton from '../components/customComponents/FavoriteButton';
import CompareButton from '../components/customComponents/CompareButton';

export default class Automobile{
    constructor(json) {
        this.caracteristiques = json;

        //Ceci sont la plupart des informations qui seront affichées à l'écran.
        //[Nom français, Nom sur la base de données, données supplémentaires]
        this.shownStats = [
          ["Prix", "Starting Price"],
          ["Type de corps", "Body type"],
          ["Génération", "Generation"],
          ["Trim", "Trim"],
          ["Rouage", "Drivetrain"],
          ["Nombre de sièges", "Number of seats"],
          ["Engine", "Engine",
            [
              ["Type de carburant", "Energy source"],
              ["Code", "Code"],
              ["Displacement", "Displacement"],
              ["Cylinder layout", "Cylinder layout"],
              ["Aspiration", "Aspiration"],
              ["Power", "Power"],
              ["Torque", "Torque"]
            ]
          ],
          ["Boîte de vitesse", "Gearbox",
            [
              ["Code", "Code"],
              ["Nombre de vitesse", "Number of gears"],
              ["Type", "Type"],
            ]
          ],
          ["Poids", "Weight"],
          ["Volume du coffre", "Trunk volume"],
          ["Dimensions", "Dimensions",
            [
              ["Wheelbase length", "Wheelbase length"],
              ["Height", "Height"],
              ["Length", "Length"],
              ["Width", "Width"]
            ]
          ],
          ["Top speed", "Top speed"],
          ["Temps d'accélération", "Acceleration times",
            [
              ["0-100 km/h", "0-100 km/h"],
              ["100-200 km/h", "100-200 km/h"],
              ["1/4 mile", "1/4 mile"],
              ["1/2 mile", "1/2 mile"]
            ]
          ],
          ["Capacitée d'essence", "Fuel tank capacity"],
          ["Consommation d'essence", "Fuel Consumption",
            [
              ["Combiné", "Combined"],
              ["Urbain", "City"],
              ["Autoroute", "Highway"],
            ]
          ],
          ["Capacitée de la battrie", "Battery capacity"],
          ["Autonomie énergétique", "Range",
            [
              ["Combiné", "Combined"],
              ["Urbain", "City"],
              ["Autoroute", "Highway"],
            ]
          ],
          ["Type de suspension", "Suspension", [["Type", "Type"]]],
          ["Type de frein disponible", "Brakes", [["Type", "Type"]]]
        ];

        this.baseStyle = StyleSheet.create({
          horizontal : {
            flexDirection : 'row',
            alignItems : 'flex-start',
          },

          title : {
            fontSize : 30,
            fontWeight: 'bold',
            color: "white"
          },
          text : {
            fontSize : 15,
            color: "white",
            padding : 4
          }
        });
    }

    createComponentArray() {
      let array = [];
      // On doit utiliser un counter car il se peut qu'un loop retourne 2 components
      let counter = 0;

      for (const statInfo of this.shownStats) {
        console.log(statInfo);
        if (statInfo != null && statInfo.length > 1) {
          let statName = statInfo[1];
          let statValue = this.caracteristiques[statName];

          if (statValue) {

            if (statInfo[2] == undefined) {
              array.push(<Text style = {this.baseStyle.text} key = {(counter++).toString()}>{statInfo[0] + " : " + statValue}</Text>);
            } else {
              let subArray = [];
              let subCounter = 0;

              for (const subStatInfo of statInfo[2]) {
                let subStatName = subStatInfo[1];
                let subStatValue = statValue[subStatName];
                if (subStatValue) {
                  subArray.push(<Text style = {this.baseStyle.text} key = {(subCounter++).toString()}>{subStatInfo[0] + " : " + subStatValue}</Text>)
                }
              }

              if (subArray.length > 0) {
                array.push(<Text style = {this.baseStyle.text} key = {(counter++).toString()}>{statInfo[0] + " : "}</Text>);
                array.push(<View key = {(counter++).toString()} style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                  {subArray}
                </View>);
              }
            }
          }
        }
      }

      return array;
    }

    render(){
      //Il doit au moins posséder cette caractéristique.
      if (!this.caracteristiques.ShownName) {
        return(
          <Text style = {this.baseStyle.text}>Cette automobile manque des données importantes...</Text>
        )
      }

      return(
        <View>
          <Text style = {this.baseStyle.title}>{this.caracteristiques.ShownName}</Text>
          {(!this.caracteristiques["Photo extérieur"]) ? null :
            <Image
              style = {{
                width: 400,
                height: 250,
                borderRadius : 10,
                padding : 30
              }}
              source={{uri: this.caracteristiques["Photo extérieur"]}}
            />
          }
          <View style = {this.baseStyle.horizontal}>
            {(!this.caracteristiques["Photo intérieur"]) ? null :
              <Image
                style = {{
                  width: 200,
                  height: 125,
                  borderRadius : 10,
                  padding : 30
                }}
                source={{uri: this.caracteristiques["Photo intérieur"]}}
              />
            }

            <FavoriteButton
              brand = {this.caracteristiques.Brand}
              model = {this.caracteristiques.Model}
            />

            <CompareButton
              brand = {this.caracteristiques.Brand}
              model = {this.caracteristiques.Model}
            />
          </View>
          {this.createComponentArray()}
        </View>
      )
    }
}
