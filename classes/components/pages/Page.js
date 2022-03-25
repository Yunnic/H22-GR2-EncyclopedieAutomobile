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
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      }
    });
  }

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

  async load() {
    this.loadPage(null);
  }

  errorHandler(catchedError) {
    if (this.goToError) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Error', params: {"catchedError": catchedError} }],
      });
    }
  }

  errorCatcher() {
    return null;
  }

  //Cette fonction est appelée après que la classe est inséré dans la vue.
  componentDidMount() {
    try {
      this.load();
    } catch (e) {
      this.errorHandler(e)
    }
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
      <View style = {this.baseStyle.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  };

  //À noter : à chaque fois que la classe change, cette fonction est appelée
  render() {
    const { data, isLoading } = this.state;
    //le truc après ? est si ça n'a pas chargé, truc après : est si c'est chargé
    return isLoading ? this.loadingPageView() : this.loadedPageView(data);
  }
};
