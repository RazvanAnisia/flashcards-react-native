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
      //handle if there are no questions in the deck yet
    currentIndex:0,
    questionsInDeck:this.props.navigation.state.params.currentDeck.questions.length  ,
    showAnswer:false,
    correctAnswers:0,
    incorrectAnswers:0,
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
    if(this.state.currentIndex < this.state.questionsInDeck - 1 ){
        const newIndex  = this.state.currentIndex + 1
        this.setState({currentIndex:newIndex})
        
        // console.log(this.state.questionsInDeck)
    }else {
        // this.props.navigation.goBack()
        this.setState({finishedDeck:true})
    }
}

showAnswer = () => {
    this.setState({showAnswer:!this.state.showAnswer})
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
    const totalQuestions = this.state.questionsInDeck
    const correctAnswers = this.state.correctAnswers
    const score = correctAnswers / totalQuestions  * 100  
    const deckTitle = this.props.navigation.state.params.currentDeck.title
    const finishedView = ( 
        <View style={styles.finishedView} >
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
        </View>
    )
    return finishedView;
}
 
  render() {
      const deck = this.props.navigation.state.params.currentDeck;
      
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
          <View style={styles.questionsContainer}>
            {!this.state.finishedDeck
              ? (deck.questions.map((question,index,array) =>
                this.state.currentIndex === index 
                ? (<View  key={index}>
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
                    </View>
                    )
                :null)
              )
             : this.finishedView()    
            }
          </View>
            <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
            <Button onPress={() =>this.nextQuestion('correct')} 
            title="Correct" color="#19e8b0"/>
            </View>
            <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
            <Button
                onPress={() =>this.nextQuestion('incorrect')}
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
      textAlign:'center',
    },
    questionsContainer:{
        height:300,
        backgroundColor:'#19e8b0',
        width:'100%',
        color:'#ffffff',
        alignItems:'center',
        paddingBottom:50
    },
    questionText:{
        fontSize:20,
        fontWeight:'bold',
        maxWidth:'70%'
    },
    score: {
        fontSize:30,
        color:"#f75151",
        fontWeight:'bold'
    },
    finishedView: {
        marginTop:50,
        justifyContent:'center',
    },
    finishedText:{
        fontSize:20
    }
  });

export default Quiz;