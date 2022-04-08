import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';

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
              <Text>Type de carburant : {this.caracteristiques.Engine["Energy source"]}</Text>
              <Text>Engine </Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>Code : {this.caracteristiques.Engine.Code}</Text> 
                <Text>Displacement : {this.caracteristiques.Engine.Displacement}</Text>
                <Text>Cylinder layout : {this.caracteristiques.Engine["Cylinder layout"]}</Text>
                <Text>Aspiration : {this.caracteristiques.Engine.Aspiration}</Text>
                <Text>Power : {this.caracteristiques.Engine.Power}</Text>
                <Text>Torque : {this.caracteristiques.Engine.Torque}</Text>
                
               
                
              </View>
              <Text>Body type : {this.caracteristiques["Body type"]}</Text>
              <Text>Top speed : {this.caracteristiques["Top speed"]}</Text>
              <Text>Weight : {this.caracteristiques["Weight"]}</Text>
              <Text>Dimensions </Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>Wheelbase lenght : {this.caracteristiques.Dimensions["Wheelbase lenght"]}</Text>
                <Text>Height : {this.caracteristiques.Dimensions.Height}</Text>
                <Text>Lenght : {this.caracteristiques.Dimensions.Lenght}</Text>
                <Text>Width : {this.caracteristiques.Dimensions.Width}</Text>
              </View>
            </View>
            
            
            
        )
    }
}