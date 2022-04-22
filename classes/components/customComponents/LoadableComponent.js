import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import LoadingIcon from './LoadingIcon.js';

export default class LoadableComponent extends Component {

  constructor(props) {
    super(props);

    //isLoading : indique si le component est chargé
    //data : info reçu de la base de données
    this.state = {
      data: [],
      isLoading: true,
      canUseLoadLogo: true
    };

    this.goToError = true;

    this.baseStyle = StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor : "#4d4d4d",
      }
    });
  }

  //Charge le component après que tous les données sont obtenues
  async loadComponent() {
    const newData = await this.load()
    const catchedError = this.errorCatcher(newData);
    if (catchedError != null) {
      this.errorHandler(catchedError);
    } else {
      this.setState({
        data: newData,
        isLoading: false
      });
    }
  }

  //Charge le component. Normalement, cette fonction est remplacé par une autre.
  async load() {
    return null;
  }

  //Recharge le component sans mettre le logo de chargement.
  async reloadWithoutLoading() {
    this.setState({
      canUseLoadLogo : false
    })
    this.componentDidMount();
  }

  //S'occupe des erreurs.
  errorHandler(catchedError) {
    if (this.goToError) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Error', params: {"catchedError": catchedError} }],
      });
    }
  }

  //Créer erreur lorsqu'il manque une valeur.
  errorCatcher(newData) {
    for (const indice in newData) {
      if (newData[indice] == undefined) {
        return `Valeur prise en ligne n'est pas valide : ${indice} !`
      }
    }
  }

  //Cette fonction est appelée après que la classe est inséré dans la vue.
  componentDidMount() {
    try {

      this.setState({
        data: [],
        isLoading: true
      });

      this.loadComponent();
    } catch (e) {
      this.errorHandler(e)
    }
  }

  //La vue du component lorsqu'elle est chargé.
  loadedView(data) {
    return (
      <View>
        <Text>Page vide</Text>
      </View>
    )
  };

  //La vue du component lorsqu'elle charge
  loadingView() {
    return (
      <View style = {this.baseStyle.container}>
        <LoadingIcon/>
      </View>
    )
  };

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  //Montre le component
  render() {
    const { data, isLoading, canUseLoadLogo} = this.state;
    console.log(data);
    //le truc après ? est si ça n'a pas chargé, truc après : est si c'est chargé
    if (!isLoading || !canUseLoadLogo) {
      return this.loadedView(data);
    } else {
      return this.loadingView();
    }
  }
};