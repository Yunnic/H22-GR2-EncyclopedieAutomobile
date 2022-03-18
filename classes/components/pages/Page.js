import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class Page extends Component {

  constructor(props, baseStyle) {
    super(props);

    //isLoading : indique si la page est chargé
    //data : info reçu de la base de données
    this.state = {
      data: [],
      isLoading: true
    };

    this.baseStyle = (baseStyle != null) ? baseStyle : StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      }
    });
  }

  loadPage(newData) {
    this.setState({
      data: newData,
      isLoading: false
    });
  }

  async load() {
    this.loadPage(null);
  }

  //Cette fonction est appelée après que la classe est inséré dans la vue.
  componentDidMount() {
    this.load();
  }

  loadedPageView(data) {
    return (
      <View>
        <Text>Page vide</Text>
      </View>
    )
  };

  loadingPageView() {
    return (
      <ActivityIndicator size = "large"/>
    )
  };

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  render() {
    const { data, isLoading } = this.state;

    //ActivityIndicator : icone de chargement
    //le truc après ? est si ça n'a pas chargé, truc après : est si c'est chargé
    return (
      <View style = {this.baseStyle.container}>
        {isLoading ? this.loadingPageView() : this.loadedPageView(data)}
      </View>
    );
  }
};
