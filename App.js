import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
const config = require('./config.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    //isLoading : indique si la page est charché
    //data : info reçu de la base de données
    this.state = {
      data: [],
      isLoading: true
    };
  }

  //https://reactnative.dev/docs/network
  async getDataFromApi(id, type) {

    const infoRequest = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      //on utilise seulement le code en dessous lorsqu'on doit envoyer des donnees
      /*
      body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue'
      })
      */
    }

    try {
      const response = await fetch(
        //[lien]/encyclopedie_voiture/{ID}/{Type}
        `${config.api.invokeUrl}/encyclopedie_voiture/${id}/${type}`,
        infoRequest
      );

      const json = await response.json();
      console.log(json);
      this.setState({ data: json.Item });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  //Cette fonction est appelée après que la classe est inséré dans la vue.
  componentDidMount() {
    //prend l'info en ligne
    this.getDataFromApi("1233", ":)");

    //sout sur version web (ctrl+shift+i, dans console)
    console.log(this.setState.data);
  }

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <Text>{data.ID}, {data.Type}, {data.test}, {data.Test}</Text>
        )}
      </View>
    );
  }
};
