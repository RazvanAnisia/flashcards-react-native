import React from 'react';
import {
  Image,
  Platform,
  Button ,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
  createStackNavigator ,
  createAppContainer
} from 'react-native';
//just for demo
import   { getDecks }  from '../utils/helpers'
import Deck from './Deck'

 class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks:getDecks(),
      currentDeck:null,
      
    }
}

  static navigationOptions = {
    title: 'Study Cards',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTitleStyle: {
      textAlign: 'center'      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  currentDeck = (newDeck) => {
    this.setState({ currentDeck:newDeck })
    this.props.navigation.navigate('Deck' , { currentDeck: newDeck})
  }
  
  render() {
    const decks = (
      <ScrollView style={styles.container}>
        { 
          Object.values(this.state.decks).map((deck, index) => 
           (<TouchableOpacity
              onPress={()=>this.currentDeck(deck)}
              key={index}
              style={styles.card}>
              <Text style={styles.cardTitle}> {deck.title}</Text>
              <Text style={styles.cardNumber}> {deck.questions.length} cards</Text>
            </TouchableOpacity>)
        )
      }
      </ScrollView>
    )
    return (
      <View style={{flex:1}}>
         {/* {this.state.currentDeck 
            ? <Deck currentDeck={this.state.currentDeck} />
            : decks} */}
            { decks }
      </View>
     
    );
  }
 
}


export default Decks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   card: {
    flex:1,
    height:150,
    borderBottomWidth: 1.5 ,
    borderBottomColor:'#000000',
    
  },
  cardTitle: {
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:50,
    color:'#f4511e'
  },
  cardNumber: {
    textAlign:'center',
    fontSize:20
  },
});