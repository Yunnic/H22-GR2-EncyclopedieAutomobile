import React from 'react';
import { TextInput, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView, SafeAreaView} from 'react-native';
import ApiCommunicator from '../../api/ApiCommunicator.js';
import LoadableComponent from '../customComponents/LoadableComponent.js';
import LoadingIcon from '../customComponents/LoadingIcon.js';
import SearchList from '../customComponents/SearchList.js';

export default class FilterPage extends LoadableComponent {

  constructor(props) {
    super(props);

    this.filters = [
      {
        name : "Marque",
        statName : "Brand",
        type : "Choice",
        //Les choix ont été pris d'ici : https://www.ultimatespecs.com/advanced-search
        //Il se peut qu'il y ait des fautes. J'ai tout écrit à la main.
        choices : [
          "a d Tramontana", "Abarth", "Acura", "Alfa Romeo", "Alpina", "Alpine",
          "Aston Martin", "Audi", "Austin", "Autobianchi", "Bentley", "BMW",
          "Bugatti", "Buick", "Cadillac", "Caterham", "Chevrolet", "Chrysler",
          "Citroen", "Cupra", "Dacia", "Daewoo", "Daihatsu", "Datsun",
          "De Tomaso", "Delorean", "Dodge", "DS", "Ferrari", "Fiat", "Ford",
          "FSO", "Galloper", "Genesis", "Gumpert", "Holden", "Honda", "Hummer",
          "Hyundai", "Infiniti", "Innocenti", "Isuzu", "JAC", "Jaguar", "Jeep",
          "Kia", "Koenigsegg", "Lada", "Lamborghini", "Lancia", "Land Rover",
          "Lexus", "Lincoln", "Lotus", "Maserati", "Maybach", "Mazda",
          "McLaren", "Mercedez Benz", "MG", "Mini", "Mitsubishi", "Morgan",
          "Morris", "Nissan", "Noble", "Oldsmobile", "Opel", "Pagani",
          "Peugeot", "PGO", "Plymouth", "Polestar", "Pontiac", "Porsche",
          "Portaro", "Proton", "qoros", "Reliant", "Renault", "Roewe",
          "Rolls Royce", "Rover", "Ruf", "Saab", "Samsung", "Seat", "Shelby",
          "Simca", "Skoda", "Smart", "Ssangyong", "Subaru", "Suzuki", "Tata",
          "Tesla", "Toyota", "Triumph", "Tvr", "Ultima", "UMM", "Vauxhall",
          "Volkswagen", "Volvo", "Yugo", "Cournil", "Dallas", "Duport",
          "Bertone", "Marcos", "Donkervoort", "Talbot", "Asia Motors",
          "Spectre", "Princess", "Mega", "Josse", "Fornasari", "Bristol",
          "Baojun", "Mahindra", "ZAZ", "Changan", "Pininfarina", "Facel Vega",
          "Eagle", "Panhard et Lavassor", "Isdera", "DAF", "Jensen", "Lola",
          "Oakland", "Apollo", "American Underslung", "AC", "AMC", "Arab",
          "ABC", "BMW Isetta", "AJS", "Adler", "Bizzarrini", "Austin Healey",
          "Albion", "VAZ", "Zender", "Vespa", "Vector", "ZIL", "Sunbeam-Talbot",
          "Yamaha", "Zastava", "Zagato", "BSA", "Willys", "Steyr-Puch", "AZLK",
          "Geo", "Red Flag", "Vanden Plas", "Alfa", "Aero", "Yue Loong",
          "Willys-Overland", "Warszawa", "GAZ", "Hongki", "Hispano Suiza",
          "Matra", "Mercury", "Messerschmitt", "Trabant", "Amphicar", "Spyker",
          "Rinspeed", "Aixam", "Ariel", "Emme", "Perry", "Vaillante",
          "Wills Sainte Claire", "Beijing", "Shanghai", "Merkur", "Paige",
          "New Orleans", "Woodill", "Venturi", "Ascari", "Zeta", "Alma",
          "Pinguin", "Ajax", "Shelby Super Cars", "ZIS", "Jordan",
          "Pennsylvania", "Abadal", "Wiesmann", "Grant", "Geely", "Tsukuba",
          "Wolseley", "Chery", "Zhongua", "Fisker", "Brilliance", "BYD",
          "Royce", "Great Wall", "Zenvo", "Monroe", "Adams Farwell", "Yaxa",
          "RiChard", "Winton", "Woods", "Allen", "Abbott", "Willys-Knight",
          "Aerocar", "Wolfe", "Aland", "Yale", "Acme", "Murray", "York Pullman",
          "Abbott Detroit", "Ace", "Alco", "Cleveland", "Bowman", "Master",
          "Anchor", "Essex", "Hilton", "Friend", "Fox", "Harvard", "Howard",
          "Marshall", "Pan American", "Pan", "Shaw", "Winther", "Rodgers",
          "Washington", "Wasp", "Gordon Murray Design", "Zimmerman", "Wyleth",
          "BAC", "Santana", "GTA", "Faraday Future (FF)", "Haval",
          "Gordon Murray Automotive", "El Trans", "Aiways", "Lynk & Co"
        ],
        value : null
      },
      {
        name : "Type de corps",
        statName : "Body type",
        type : "Choice",
        //Les choix ont été pris d'ici : https://www.ultimatespecs.com/advanced-search
        choices : [
          "Cabrio", "Comercial", "Coupé", "Crossover", "Estate", "Fastback",
          "Hatchback", "Landaulette", "Liftback", "Limousine", "Microcar",
          "MPV", "Pick Up", "Roadster", "Sedan", "Supercar", "SUV", "SUV / TT",
          "Targa", "Targa top", "Truck", "TT", "Turismo", "Van"
        ],
        value : null
      },
      {
        name : "Prix",
        statName : "Starting Price",
        type : "Min-Max",
        forcedMinimum : "0",
        value : null
      },
      {
        name : "Nombre de sièges",
        statName : "Number of seats",
        type : "Min-Max",
        forcedMinimum : "1",
        value : null
      },
      {
        name : "Volume du coffre",
        statName : "Trunk volume",
        type : "Min-Max",
        forcedMinimum : "0",
        value : null
      },
      {
        name : "Vitesse maximale",
        statName : "Top speed",
        type : "Min-Max",
        forcedMinimum : "0",
        value : null
      },
    ]

    this.baseStyle = StyleSheet.create({
        container : {
          paddingTop : 20,
          paddingBottom : 20,
          flexGrow : 1,
          alignItems : 'center',
        },
        title: {
          marginTop: 16,
          marginBottom: 16,
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          color : "white",
          padding : 10
        },
        secondTitle: {
          textAlign: "left",
          fontSize: 20,
          fontWeight: "bold",
          textAlignVertical: "center",
          color : "white",
          paddingTop : 30
        },
        text : {
          textAlign: "left",
          fontSize : 20,
          color: "white",
          padding : 4
        },
        horizontal : {
          flex : 1,
          flexDirection : 'row',
          margin : 10
        },
        horizontalLeft : {
          flexDirection : 'row',
          alignItems : 'center',
          margin : 2
        },
        input: {
          height: 40,
          width: 75,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          color : "white",
          backgroundColor : "rgba(225,225,225,.25)",
          borderRadius : 15,
        },
        confirmButton: {
          height: 40,
          width: 120,
          borderWidth: 1,
          color : "white",
          backgroundColor : "rgba(125,125,125,.25)",
          borderRadius : 15,
          alignItems : 'center',
          justifyContent : 'center',
          marginTop : 50
        },
    });

    const params = this.props.route.params;
    this.searchPage = params.searchPage;
  }

  insertFilters() {
    let texts = [];
    for (let i = 0; i < this.filters.length; i++) {
      let filterObject = this.filters[i];

      texts.push(
        <View key = {i}>

          <Text
          style = {this.baseStyle.secondTitle}>
            {filterObject.name + " : "}
          </Text>

          {
            (filterObject.type === "Min-Max") ?
              <View style = {this.baseStyle.horizontalLeft}>
                <Text style = {this.baseStyle.text}> Min : </Text>
                <TextInput style = {this.baseStyle.input}/>

                <Text style = {this.baseStyle.text}> Max : </Text>
                <TextInput style = {this.baseStyle.input}/>
              </View>
            : null
          }

        </View>
      )
    }

    return texts
  }

  confirm(page) {
    //page.searchPage.blablabla
    page.props.navigation.goBack()
  }

  loadedView(data) {
    return(
      <ScrollView contentContainerStyle = {this.baseStyle.container}>
        <Text style = {this.baseStyle.title}> Filtres </Text>
        {this.insertFilters()}

        <Pressable
        style = {this.baseStyle.confirmButton}
        onPress={() => this.confirm(this)}>
          <Text style = {this.baseStyle.text}> Confirm </Text>
        </Pressable>

      </ScrollView>
    )
  }
};