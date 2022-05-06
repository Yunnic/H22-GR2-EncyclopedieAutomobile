import React from 'react';
import {StyleSheet, Text, ScrollView } from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';

export default class AuthorsPage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flexGrow : 1,
            alignItems : 'center',
            justifyContent : 'center',
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
            fontSize: 15,
            fontWeight: "bold",
            textAlignVertical: "center",
            color : "white",
          },
    });
  }

  loadedView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Projet d'intégration en </Text>
        <Text style = {this.baseStyle.title}> Sciences Informatiques et Mathématiques </Text>
        <Text style = {this.baseStyle.subtitle}> Collège de Bois-de-Boulogne (Hiver 2022)</Text>
        <Text style = {this.baseStyle.subtitle}> Liste d'auteurs </Text>
        <Text style = {this.baseStyle.text}> Maxime Rainville </Text>
        <Text style = {this.baseStyle.text}> Severyn Tynkalyuk </Text>
        <Text style = {this.baseStyle.text}> Yannick Lafontaine </Text>

      </ScrollView>
    )
  }
};
