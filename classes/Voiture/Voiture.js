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
                  width: 50,
                  height: 50
                }}
              source={{uri: this.caracteristiques["Photo extérieur"]}}
              />
            </View>
            
            
            
        )
    }
}