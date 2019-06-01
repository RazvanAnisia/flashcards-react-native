import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";

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
  
   }

  render() {
    const currentDeck = this.props.navigation.state.params.currentDeck;
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
        <Text style={styles.cardTitle}>{currentDeck.title}</Text>
        <Text style={styles.cardNumber}>
          {currentDeck.questions.length} cards
        </Text>
        <View style={{ width: "30%", textAlign: "center", marginTop: 300 }}>
          <Button onPress={()=>this.props.navigation.navigate('AddCard', {deckTitle:currentDeck.title})} 
           title="Add Card" color="#f4511e" />
        </View>
        <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
          <Button
            style={styles.startQuizBtn}
            onPress={this.startQuiz}
            title="Start Quiz"
            color="#000000"
          />
        </View>
      </View>
    );
  }
}


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
  });

export default Deck;