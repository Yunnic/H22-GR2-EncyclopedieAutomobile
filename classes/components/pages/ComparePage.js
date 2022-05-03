import React from 'react';
import {StyleSheet, Text, ScrollView } from 'react-native';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import { Table, Row, Rows } from 'react-native-table-component';

export default class ComparePage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.baseStyle = StyleSheet.create({
        container : {
            flex : 1,
            padding : 16,
            paddingTop : 70,
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
        head: { height: 40, backgroundColor: '#f1d8ff' },
        rowText: { margin: 6 }
    });

    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456'],
        ['a', 'b', 'c', 'd']
      ]
    }
  }

  //https://www.npmjs.com/package/react-native-table-component
  loadedView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Pas encore implémenté </Text>

        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={this.state.tableHead} style={this.baseStyle.head} textStyle={this.baseStyle.rowText}/>
          <Rows data={this.state.tableData} style = {{backgroundColor : '#a8d1ff'}} textStyle={this.baseStyle.rowText}/>
        </Table>
      </ScrollView>
    )
  }
};
