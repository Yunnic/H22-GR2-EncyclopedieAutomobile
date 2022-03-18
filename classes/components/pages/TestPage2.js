import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View } from 'react-native';
const ApiCommunicator = require('../../api/ApiCommunicator.js');


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

    //isLoading : indique si la page est chargé
    //data : info reçu de la base de données
    this.state = {
      data: [],
      isLoading: true
    };
  }

  async load() {
    const newData = await ApiCommunicator.default.getCar("BMW a", "M3");

    this.setState({
      data: newData,
      isLoading: false
    });
  }

  //Cette fonction est appelée après que la classe est inséré dans la vue.
  componentDidMount() {
    this.load();
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
            <Text>:)</Text>
            <Button
              title="Aller page 1!"
              onPress={() => this.props.navigation.navigate("Page 1")} // Navigue à p.1
            />
          </View>
        }
      </View>
    );
  }
};
