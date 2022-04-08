import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class Page extends Component {

  constructor(props) {
    super(props);

    //isLoading : indique si la page est chargé
    //data : info reçu de la base de données
    this.state = {
      data: [],
      isLoading: true
    };

    this.goToError = true;

    this.baseStyle = StyleSheet.create({
      container: {
        flexGrow: 1,
        margin: 40,
        justifyContent: 'center',
        marginHorizontal: 16,
      }
    });
  }

  //Charge la page après que tous les données sont obtenues
  loadPage(newData) {
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

  //Charge la page. Normalement, cette fonction est remplacé par une autre.
  async load() {
    this.loadPage(null);
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
      this.load();
    } catch (e) {
      this.errorHandler(e)
    }
  }

  //La vue de la page lorsqu'elle est chargé.
  loadedPageView(data) {
    return (
      <View>
        <Text>Page vide</Text>
      </View>
    )
  };

  //La vue de la page lorsqu'elle charge
  loadingPageView() {
    return (
      <View style = {this.baseStyle.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  };

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  //Montre la page
  render() {
    const { data, isLoading } = this.state;
    //le truc après ? est si ça n'a pas chargé, truc après : est si c'est chargé
    return isLoading ? this.loadingPageView() : this.loadedPageView(data);
  }
};
