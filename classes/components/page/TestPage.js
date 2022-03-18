import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
const config = require('../../../config.json');


const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});

export default class TestPage extends Component {

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
  async getDataFromApi(Brand, Model) {

    const infoRequest = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    try {
      const response = await fetch(
        `${config.api.invokeUrl}/encyclopedie_automobile/${Brand}/${Model}`,
        infoRequest
      );

      const json = await response.json();
      console.log(json);
      console.log("a");
      this.setState({ data: json.Item });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  //Cette fonction est appelée après que la classe est inséré dans la vue.
  componentDidMount() {

    //prend l'info en ligne (ca peut prendre du temps)
    this.getDataFromApi("BMW a", "M3");

    //sout sur version web (ctrl+shift+i, dans console)
    console.log(this.setState.data);
  }

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  render() {
    const { data, isLoading } = this.state;

    //ActivityIndicator : icone de chargement
    //le truc après ? est si ça n'a pas chargé, truc après : est si c'est chargé
    return (
      <View style = {styles.test}>
        {isLoading ? <ActivityIndicator/> :
          <View>
            <Text>{JSON.stringify(data)}</Text>
            <Button
              title="Aller page 2!"
              onPress={() => this.props.navigation.navigate("Page 2")} // Navigue à p.2
            />
          </View>
        }
      </View>
    );
  }
};
