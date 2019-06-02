import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";

class Quiz extends React.Component {
  
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

  state={
    currentIndex:0,
    questionsInDeck:this.props.navigation.state.params.currentDeck.questions.length -1 ,
    showAnswer:false,
    correctAnswers:0,
    incorrectAnswers:0

  }


  
nextQuestion = () => {
    if(this.state.currentIndex < this.state.questionsInDeck ){
        const newIndex  = this.state.currentIndex + 1
        this.setState({currentIndex:newIndex})
        // console.log(newIndex)
        // console.log(this.state.questionsInDeck)
    }else {
        this.props.navigation.goBack()
    }
}

showAnswer = () => {
    this.setState({showAnswer:!this.state.showAnswer})
}
 
  render() {
      const deck = this.props.navigation.state.params.currentDeck;
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
          <View style={styles.questionsContainer}>
            {deck.questions.map((question,index,array) =>
                this.state.currentIndex === index 
                ? (<View  key={question.id}>
                    <Text>{index + 1}/{array.length}</Text>
                    <Text style={styles.questionText}>
                      {this.state.showAnswer ? question.answer : question.question}
                    </Text>
                    <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
                        <Button
                            title={this.state.showAnswer ? 'Back to question' : 'Show Answer' }  
                            color="#f4511e"
                            onPress={this.showAnswer}/>
                     </View>
                </View>)
                :null
            ) }
          </View>
        <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
          <Button onPress={this.nextQuestion} 
           title="Correct" color="#19e8b0"/>
        </View>
        <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
          <Button
            onPress={this.nextQuestion}
            title="Incorrect"
            color="#f75151"
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
      textAlign:'center'
    },
    questionsContainer:{
        backgroundColor:'#19e8b0',
        width:'100%',
        color:'#ffffff',
        alignItems:'center',
        paddingBottom:50
    },
    questionText:{
        fontSize:20,
        fontWeight:'bold'
    }
  });

export default Quiz;