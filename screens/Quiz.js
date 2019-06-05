import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";
import { connect} from 'react-redux'
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

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

  state = {
    currentIndex:0,
    correctAnswers:0,
    incorrectAnswers:0,
    showAnswer:false,
    finishedDeck:false
  }
  
nextQuestion = (answerType) => {
    if(answerType === 'correct'){
      this.setState((prevState) => ({
          correctAnswers: prevState.correctAnswers + 1}))
    }else{
          this.setState((prevState) => ({
              incorrectAnswers: prevState.incorrectAnswers + 1
          })); 
    }   
    if(this.state.currentIndex < this.props.deck.questions.length - 1 ){
        const newIndex  = this.state.currentIndex + 1
        this.setState({currentIndex:newIndex})
    }else{
        this.setState({finishedDeck:true})
        //if the user has completed the deck, then remove the notification set up
        clearLocalNotification();
        //Set one for the next day
        setLocalNotification();
    }
}

showAnswer = () => {
    this.setState({showAnswer:!this.state.showAnswer})
}
showButtons = () => {
  return (
  <View style={{ flex:1, textAlign: "center", alignItems:'center'}}>
    <View style={{ width: "30%", textAlign: "center", alignItems:'center', marginTop: 30 }}>
    <Button onPress={() =>this.nextQuestion('correct')} 
      title="Correct" color="#19e8b0"/>
    </View>
    <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
      <Button
          onPress={() =>this.nextQuestion('incorrect')}
          title="Incorrect"
          color="#f70707"/>
    </View>
  </View>
  )
}
resetQuiz = () => {
    this.setState({ 
        currentIndex:0,
        showAnswer:false,
        correctAnswers:0,
        incorrectAnswers:0,
        finishedDeck:false}
      )
}

finishedView = () => {
    const totalQuestions = this.props.deck.questions.length
    const correctAnswers = this.state.correctAnswers
    const score = correctAnswers / totalQuestions  * 100  

    const finishedView = 
    (<View style={styles.finishedView} >
            <Text style={styles.finishedText} >You got a score of <Text style={styles.score}>
                {score.toFixed(0)}%</Text>
            </Text>
            <Text style={styles.finishedText}>You got <Text style={styles.score}>
                    {this.state.incorrectAnswers}
            </Text> {this.state.incorrectAnswers === 1 ? 'question' : 'questions' } wrong</Text>
            <View style={{ width: "30%", textAlign: "center",  alignItems:'center', marginTop: 30 }}>
                <Button
                    title={'Restart Quiz'}  
                    color="#f4511e"
                    onPress={this.resetQuiz}/>
            </View>
            <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
                     <Button
                    title={"Back to deck"}  
                    color="#000000"
                    onPress={()=> this.props.navigation.goBack() }/>
            </View>
     </View>)

    return finishedView;
}
 
  render() {
    const deck = this.props.deck;

    return (
      <View style={[styles.container, { alignItems: "center" }]}>
          <View style={styles.questionsContainer}>
            {!this.state.finishedDeck
              ? (deck.questions.map((question,index,array) =>
                this.state.currentIndex === index 
                ? (<View  style={{ flex:1, textAlign: "center", alignItems:'center'}} 
                     key={index}>
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
                : null)
              )
             :this.finishedView()    
            }
          </View>
           {!this.state.finishedDeck ? this.showButtons() : null}
      </View>
    );
  }
}

function mapStateToProps (state,props) {
    deckTitle = props.navigation.state.params.currentDeck.title
    return {deck:state[deckTitle]}
}


export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      textAlign:'center',
    },
    questionsContainer:{
        height:300,
        backgroundColor:'#00bbff',
        width:'100%',
        color:'#ffffff',
        alignItems:'center',
        paddingBottom:50,
        paddingTop:20
    },
    questionText:{
        fontSize:20,
        fontWeight:'bold',
        maxWidth:'70%',
        textAlign:'center'
    },
    score: {
        fontSize:30,
        color:"#f75151",
        fontWeight:'bold'
    },
    finishedView: {
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    finishedText:{
        fontSize:20
    }
  });

