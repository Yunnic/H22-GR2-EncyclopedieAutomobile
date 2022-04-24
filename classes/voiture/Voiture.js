import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';
import { getCurrentTimestamp } from 'react-native/Libraries/Utilities/createPerformanceLogger';
import BoutonImageTitre from '../components/customComponents/BoutonImageTitre';

export default class Voiture{
    constructor(json) {
        this.caracteristiques = json;

        this.baseStyle = StyleSheet.create({
          horizontal : {
            flexDirection : 'row',
            alignItems : 'center',
            backgroundColor : "#4d4d4d",
          },
        });
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

      <View style = {this.baseStyle.horizontal}>

      <Image style = {{
                  width: 200,
                  height: 125
                }}
              source={{uri: this.caracteristiques["Photo intérieur"]}}
              />

          <BoutonImageTitre
          title = "Favorite"
          color = "green"
          imageSource = {{uri : 'https://cdn.pixabay.com/photo/2016/12/18/11/01/star-1915448_1280.png'}}
          />
            </View>

              <Text>Prix : {this.caracteristiques["Starting Price"]}</Text>
              <Text>Type de corps : {this.caracteristiques["Body type"]}</Text>
              <Text>Génération : {this.caracteristiques.Generation}</Text>
              <Text>Trim : {this.caracteristiques.Trim}</Text>
              <Text>Rouage : {this.caracteristiques.Drivetrain}</Text>
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
             <Text>Boîte de vitesse : </Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>Code : {this.caracteristiques["Gearbox"]["Code"]}</Text>
                <Text>Nombre de vitesse : {this.caracteristiques["Gearbox"]["Number of gears"]}</Text>
                <Text>Type : {this.caracteristiques["Gearbox"]["Type"]}</Text>
              </View>

              <Text>Poids : {this.caracteristiques["Weight"]}</Text>
              <Text>Volume du coffre : {this.caracteristiques["Trunk volume"]}</Text>
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

              <Text>Capacitée d'essence : {this.caracteristiques["Fuel tank capacity"]}</Text>
              <Text>Consomation d'essence : </Text>
              <View style = {{paddingLeft: 50, alignItems: "flex-start"}}>
                <Text>Combiné : {this.caracteristiques["Fuel Consumption"]["Combined"]}</Text>
                <Text>Urbain : {this.caracteristiques["Fuel Consumption"]["City"]}</Text>
                <Text>Autoroute : {this.caracteristiques["Fuel Consumption"]["Highway"]}</Text>
              </View>
              <Text>Type de suspension : {this.caracteristiques["Suspension"]["Type"]}</Text>
              <Text>Type de frein disponible : {this.caracteristiques["Brakes"]["Type"]}</Text>


            

            </View>
        )
    }
}