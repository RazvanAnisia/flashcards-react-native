import React from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import {saveDeckTitle} from '../utils/helpers'
import { createDeck } from '../actions'
import { connect} from 'react-redux'


class AddDeck extends React.Component {
  static navigationOptions = {
    title: 'Add Deck',
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

  state={
    titleName: null,
    disabledBtn: true
  }

  onChangeTitle = (text) => {
    this.setState({titleName:text},  this.checkInputs)
   
  }
  resetState = () => {
    this.setState({titleName:null})
  }
  handleNewDeckTitleSubmit = () => {
    this.props.dispatch(createDeck(this.state.titleName))
    saveDeckTitle(this.state.titleName)
    this.resetState();
    this.props.navigation.goBack()
  }
  checkInputs = () => {
    if(this.state.titleName !== ' ' && this.state.titleName ) {
      this.setState({disabledBtn:false})
    }else {
      this.setState({disabledBtn:true})
    }
}
  render() {
 
    return (
      <View style={styles.container}>
        <Text style={styles.newTitleText}>What is the title of your new deck?</Text>
        <TextInput
        onChangeText={this.onChangeTitle}
        style={styles.input}
        value={this.state.titleName}
      />
      <View style={styles.submitBtn} >
       <Button
            disabled={this.state.disabledBtn}
            title="Create Deck"
            color="#f4511e"
            onPress={this.handleNewDeckTitleSubmit}
          />
      </View>
      </View>
    );
  }
}



function mapStateToProps (state) {
  return {decks:state}
}


export default connect(mapStateToProps)(AddDeck);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  newTitleText: {
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center'
  },
  submitBtn:{
    marginTop:100,
    width:200
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
});
