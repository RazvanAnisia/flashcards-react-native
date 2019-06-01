import React from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { addNewCard } from '../utils/helpers'

export default class AddCard extends React.Component {

    state = {
        questionName:'',
        questionAnswer:''
    }

    static navigationOptions = ({navigation}) => {
        const { deckTitle } = navigation.state.params;
         return {
         headerTitle:deckTitle,
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

    addNewCardSubmit = () => {
        const newCard = {
            question: this.state.questionName,
            answer:this.state.questionAnswer
        }
        const deckTitle = this.props.navigation.state.params.deckTitle
        addNewCard(deckTitle,newCard)
    }
    onChangeQuestionName= (text) => {
       this.setState({questionName:text}) 
    }
    onChangeQuestionAnswer= (text) => {
        this.setState({questionAnswer:text}) 
    }


  render() {
    return (
      <View style={styles.container}>
       <Text style={styles.newCardText}>Add a new Card</Text>
       <TextInput
        onChangeText={this.onChangeQuestionName}
        style={styles.input}
        value={this.state.questionName}
      />
      <TextInput
        onChangeText={this.onChangeQuestionAnswer}
        style={styles.input}
        value={this.state.questionAnswer}
      />
      <View style={styles.submitBtn} >
       <Button
            title="Submit"
            color="#000000"
            onPress={this.addNewCardSubmit}
          />
      </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop:50,
    marginLeft:20,
    marginRight:20,
    width:'70%',
    fontSize:20
  },
  newCardText: {
      fontWeight:'bold',
      fontSize:30
  },
  submitBtn:{
    marginTop:100,
    width:200
  }
});