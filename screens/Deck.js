import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";
import { getDeck } from '../utils/helpers'
import { connect} from 'react-redux'

class Deck extends React.Component {
   
  static navigationOptions = ({navigation}) => {
    const { currentDeck } = navigation.state.params;
     return {
      title:currentDeck.title,
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
     }
  }   
   startQuiz = () => {
    this.props.navigation.navigate('Quiz', {currentDeck:this.props.navigation.state.params.currentDeck})
   }
 
   
   noCards = () => {
     return (      
        <Text style={{marginTop:100, fontSize:18,textAlign:'center'}}>Sorry there are no cards in this deck yet.Maybe add some? :)</Text>
     )
   }
   showDeck = () => {
    const deckTitle = this.props.navigation.state.params.currentDeck.title
    const currentDeck = this.props.deck;
    
     return (
      <View style={[styles.container, { alignItems: "center" }]}>
        <Text style={styles.cardTitle}>{currentDeck.title}</Text>
       {currentDeck.questions.length > 0
        ? ( <Text style={styles.cardNumber}>
          {currentDeck.questions.length} cards
        </Text>)
        : this.noCards()
        }
        <View style={{ width: "30%", textAlign: "center", marginTop: 100 }}>
          <Button onPress={()=>this.props.navigation.navigate('AddCard', {deckTitle:deckTitle })} 
           title="Add Card" color="#f4511e"  />
        </View>
         { currentDeck.questions.length > 0 
         ? (
          <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
            <Button
              onPress={this.startQuiz}
              title="Start Quiz"
              color="#000000"
            />
          </View>
         )
         :null}
       
        <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
         {/* <Text 
           onPress={this.handleDeleteDeck}
           style={styles.deleteText}>
           Delete Deck
          </Text> */}
        </View>
        </View>    
     )
   }

  render() {
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
       { this.props.deck
        ? this.showDeck()
        : null}
      </View>
    );
  }
}

function mapStateToProps (state,props) {
  deckTitle = props.navigation.state.params.currentDeck.title
  return {deck:state[deckTitle]}
}
  

export default connect(mapStateToProps)(Deck);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    cardTitle: {
      fontSize:30,
      fontWeight:'bold',
      textAlign:'center',
      marginTop:50
    },
    cardNumber: {
      textAlign:'center',
      fontSize:20
    },
    deleteText: {
      color:'#f4511e',
      fontSize:22,
      textAlign:'center'
    }
  });




