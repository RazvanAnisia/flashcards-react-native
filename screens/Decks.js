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

import { getDecks }  from '../utils/helpers'
import { connect} from 'react-redux'
import { receiveDecks } from  '../actions'

 class Decks extends React.Component {
    state = {
      decks:'',
      currentDeck:null,
      loading:true
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

  componentDidMount()  {
    //async
    getDecks().then((res) => { 
      this.props.dispatch(receiveDecks(res))
      })
      .then(()=>this.setState({loading:true}))
    }
  
  manualUpdate = () => {
     //async
     getDecks().then((res) => { 
      this.setState({decks:res})})
    }
  

  currentDeck = (newDeck) => {
    this.setState({ currentDeck:newDeck })
    this.props.navigation.navigate('Deck' , { currentDeck: newDeck })
    //manualUpdate:this.manualUpdate
  }
  
  render() {
      // console.log(this.props.decks)
   //console.log(this.props.decks)
    const decks = (
      <ScrollView style={styles.container}>
        { 
          Object.values(this.props.decks).map((deck, index) => 
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
          {decks}
      </View>
     
    );
  }
 
}

function mapStateToProps (state) {
  return {decks:state}
}


export default connect(mapStateToProps)(Decks);



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