import React from 'react';
import {
  Image,
  Platform,
  Button ,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  createStackNavigator ,
  createAppContainer,
  Animated,
  ActivityIndicator,
} from 'react-native';

import { getDecks }  from '../utils/helpers'
import { connect} from 'react-redux'
import { receiveDecks } from  '../actions'



const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

 class Decks extends React.Component {
    state = {
      decks:'',
      currentDeck:null,      
      fadeAnim: new Animated.Value(1),
      ready:false
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
      this.props.dispatch(receiveDecks(res))})
      .then(()=>this.setState({ready:true}))
    }
  
  currentDeck = (newDeck) => {
    this.setState({ currentDeck:newDeck })
    this.props.navigation.navigate('Deck' , { currentDeck: newDeck })
  }
  
  render() {
    let { fadeAnim } = this.state
    const decks = (
      <ScrollView style={styles.container}>
         <View style={[{alignItems:'center'},{opacity:fadeAnim}]}> 
          { Object.values(this.props.decks).map((deck, index) => 
           (<TouchableOpacity
              onPress={()=> this.currentDeck(deck)}
              key={index}
              style={styles.card}>
              <Text style={styles.cardTitle}> {deck.title}</Text>
              <Text style={styles.cardNumber}> {deck.questions.length} cards</Text>
            </TouchableOpacity>)
          )
        
         }
        </View>
      </ScrollView>
    )
    return (
      <View style={{flex:1}}>
          {this.state.ready ? decks : <ActivityIndicator size="large" color="#f4511e" style={{marginTop:300}}/>}
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
    backgroundColor: '#eee',
    paddingTop:20
  },
   card: {
    flex:1,
    width:'60%',
    height:120,
    marginTop:5,
    marginBottom:5,
    backgroundColor:'#ffffff'
  },
  cardTitle: {
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:20,
    color:'#f4511e'
  },
  cardNumber: {
    textAlign:'center',
    fontSize:20
  },
});