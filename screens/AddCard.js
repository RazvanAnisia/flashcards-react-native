import React from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { addNewCard } from '../utils/helpers'
import { createCard } from '../actions'
import { connect} from 'react-redux'

import {KeyboardAvoidingView} from 'react-native';


class AddCard extends React.Component {

    state = {
        questionName:null,
        questionAnswer:null,
        disabledBtn:true
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
        addNewCard(deckTitle, newCard)
        this.props.dispatch(createCard(deckTitle, newCard.question, newCard.answer))
        this.props.navigation.goBack()
    }

    onChangeQuestionName= (text) => {
       this.setState({questionName:text},  this.checkInputs)
       
    }

    onChangeQuestionAnswer= (text) => {
        this.setState({questionAnswer:text}, this.checkInputs) 
    }

    checkInputs = () => {
        if(this.state.questionAnswer && this.state.questionAnswer !== '' && this.state.questionName && this.state.questionName !== '') {
          this.setState({disabledBtn:false})
        }else {
          this.setState({disabledBtn:true})
        }
    }


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
              disabled={this.state.disabledBtn}
              title="Submit"
              color="#000000"
              onPress={this.addNewCardSubmit}
            />
        </View>
     </KeyboardAvoidingView>
    );
  }
}



function mapStateToProps (state) {
  return {decks:state}
}
export default connect(mapStateToProps)(AddCard);

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