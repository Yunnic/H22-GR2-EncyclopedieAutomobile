import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';

//pages
import TestPage from './classes/components/pages/TestPage.js';
import TestPage2 from './classes/components/pages/TestPage2.js';
import ErrorPage from './classes/components/pages/ErrorPage.js';
import MenuPage from './classes/components/pages/MenuPage.js';
import AuteursPage from './classes/components/pages/AuteursPage.js';
import CataloguePage from './classes/components/pages/CataloguePage.js';
import RecherchePage from './classes/components/pages/RecherchePage.js';
import FavorisPage from './classes/components/pages/FavorisPage.js';
import VoiturePage from './classes/components/pages/VoiturePage.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    //S'assure que l'ecran est en mode portrait.
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    //https://flatuicolors.com/palette/au
    this.theme = {
      dark: true,
      colors: {
        primary: 'rgb(2,0,0)', //?
        background: '#c8d6e5', //page
        card: '#54a0ff', //header
        text: '#222f3e', //header text
        border: '#54a0ff', //header outline
        notification: 'rgb(255, 0, 255)', //?
      },
    };

    this.defaultStyle = {
      container : {
        flexGrow: 1,
        backgroundColor: this.theme.colors.background,
      }
    }
  }

  render() {
    const Stack = createNativeStackNavigator();

    return (
      <SafeAreaView style = {this.defaultStyle.container}>
        <NavigationContainer theme = {this.theme}>
          <Stack.Navigator
          screenOptions={
            {
              headerTransparent: true,
              headerTitle: "",
              elevation: 0,
              shadowOpacity: 0,
              borderWidth: 0,
              shadowColor: 'transparent'
            }
          }
          >
            <Stack.Screen name="Menu" component={MenuPage}/>
            <Stack.Screen name="Page 1" component={TestPage}/>
            <Stack.Screen name="Page 2" component={TestPage2}/>
            <Stack.Screen name="Error" component={ErrorPage}/>
            <Stack.Screen name="Auteurs" component={AuteursPage}/>
            <Stack.Screen name="Catalogue" component={CataloguePage}/>
            <Stack.Screen name="Recherche" component={RecherchePage}/>
            <Stack.Screen name="Favoris" component={FavorisPage}/>
            <Stack.Screen name="Voiture" component={VoiturePage}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
};
