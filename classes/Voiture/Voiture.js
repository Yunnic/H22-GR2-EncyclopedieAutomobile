import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';

import ImageTitre from '../components/vueVoiture/imageTitre.js';

export default class Voiture{
    constructor(json) {
        this.caracteristiques = json;
    }



    affichageVoiture(){
        return(
            <View>
              <Text>{this.caracteristiques["ShownName"]}</Text>
              <Image
              style = {{
                  width: 400,
                  height: 250
                }}
              source={{uri: this.caracteristiques["Photo extérieur"]}}
              />
              <Image
              style = {{
                  width: 200,
                  height: 125
                }}
              source={{uri: this.caracteristiques["Photo intérieur"]}}
              />
              <Text>Prix : {this.caracteristiques["Starting Price"]}</Text>
              <Text>Type de corps : {this.caracteristiques["Body type"]}</Text>
              <Text>Génération : {this.caracteristiques.Generation}</Text>
              <Text>Trim : {this.caracteristiques.Trim}</Text>
              <Text>Nombre de siège : {this.caracteristiques["Number of seats"]}</Text>
              <Text>Type de carburant : {this.caracteristiques.Engine["Energy source"]}</Text>
              <Text>Engine :</Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>Code : {this.caracteristiques.Engine.Code}</Text>
                <Text>Displacement : {this.caracteristiques.Engine.Displacement}</Text>
                <Text>Cylinder layout : {this.caracteristiques.Engine["Cylinder layout"]}</Text>
                <Text>Aspiration : {this.caracteristiques.Engine.Aspiration}</Text>
                <Text>Power : {this.caracteristiques.Engine.Power}</Text>
                <Text>Torque : {this.caracteristiques.Engine.Torque}</Text>
             </View>

              <Text>Weight : {this.caracteristiques["Weight"]}</Text>
              <Text>Dimensions :</Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>Wheelbase length : {this.caracteristiques.Dimensions["Wheelbase length"]}</Text>
                <Text>Height : {this.caracteristiques.Dimensions.Height}</Text>
                <Text>Length : {this.caracteristiques.Dimensions.Length}</Text>
                <Text>Width : {this.caracteristiques.Dimensions.Width}</Text>
              </View>
              <Text>Top speed : {this.caracteristiques["Top speed"]}</Text>
              <Text>Temps d'acceleration : </Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>0-100 km/h : {this.caracteristiques["Acceleration times"]["0-100 km/h"]}</Text>
                <Text>100-200 km/h : {this.caracteristiques["Acceleration times"]["100-200 km/h"]}</Text>
                <Text>1/4 mile : {this.caracteristiques["Acceleration times"]["1/4 mile"]}</Text>
                <Text>1/2 mile : {this.caracteristiques["Acceleration times"]["1/2 mile"]}</Text>
              </View>

            </View>
        )
    }
}
