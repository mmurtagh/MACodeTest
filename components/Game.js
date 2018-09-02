import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';
import PostQuestionModal from './PostQuestionModal'
import * as Constants from '../utility/Constants'
import * as Fetcher from '../utility/Fetcher'
import * as Vibrator from '../utility/Vibrator'


/*
Component class representing the main game screen.

--------------------
Props:
--------------------
  gameData:         array of objects. Each object contains all the necessary data for an individual question.
    prodID:         prodID of the item
    caption:        description of the item
    price:          the item's actual price
    fakePrice:      the fake price presented to the user
    imageURI:       link to the item's picture
  endGameFunc:      function passed from App.js. When called triggers the post game screen

--------------------
State:
--------------------
  question:         integer representing the question index; find the proper game data with this.props.gameData[this.state.question]
  modalVisible:     boolean indicating if the modal that's shown when a question is answered is visible. passed as prop to PostQuestionModal.js
  correctQuestion:  boolean indicating if the current question was answered correctly. passed as prop to PostQuestionModal to determine Correct/Wrong message
  prodLink:         link to product page on shop.com of the current question product
  amountCorrect:    the number of questions answered correctly at any point in the game
  lastQuestion:     boolean indicating if the current question is the last question
*/

export default class Game extends Component<Props>{

  constructor(props){
    super(props);
    this.state = {
      question: 0,
      modalVisible: false,
      correctQuestion: false,
      prodLink: "",
      amountCorrect: 0,
      lastQuestion: false
    };
    Fetcher.fetchProdLink(this.props.gameData[0].prodID,this.recieveProdLink.bind(this)); //call product API to get the shop.com product link
  }

  /*
  Function called to go to the next question
  Called by the onPress function of the PostQuestionModal.
  sets the state the following way:
    question: iterates one question forward
    modalVisible: sets to false; makes the modal dissapear
    lastQuestion: sets to indicate if this is the last question. only place set.
  */
  nextQuestion(){
    var lastQuestion = false;
    if(this.state.question + 1 == this.props.gameData.length-1){
      lastQuestion = true;
    }
    this.setState({
      question: this.state.question + 1,
      modalVisible: false,
      lastQuestion: lastQuestion
    });
  }

  /*
  Callback function for the shop.com product API call.

  params:
    prodLink: the prodLink returned by the shop.com product API call
  */
  recieveProdLink(prodLink){
    this.setState({
      prodLink: prodLink
    });
  }

  /*
  Called whenever a question is answered
  Triggered by pressing the "Higher" and "Lower" buttons
  sets the state, vibrates the phone appropriately, and fetches the product link using the shop.com product API
  sets the state the following way:
    modalVisible: sets to true; makes the modal appear
    correctQuestion: sets to indicate if this the question was answered correctly
    prodLink: set to the empty string to prevent shop.com link from working until the API returns a response
    amountCorrect: iterates if answered correctly

  params:
    higher: boolean indicating if the user answered "higher". used to determine if the question was answered correctly.
  */
  answerQuestion(higher){
    var answer = this.props.gameData[this.state.question].fakePrice < this.props.gameData[this.state.question].price;
    var correct = (higher == answer);
    var amountCorrect = this.state.amountCorrect;
    if(correct) amountCorrect++;
    this.setState({
      modalVisible: true,
      correctQuestion: correct,
      prodLink: "",
      amountCorrect: amountCorrect
    });
    Vibrator.answerVibrate(correct);
    Fetcher.fetchProdLink(this.props.gameData[this.state.question].prodID,this.recieveProdLink.bind(this));
  }

  /*
  Ends the game and triggers the end game screen
  Calls the endGameFunC function passed down via props from App.js with number of questions answered correctly
  passed down to the PostQuestionModal and called by clicking the "See Results" button at the end of the game
  */
  endGame(){
    this.props.endGameFunc(this.state.amountCorrect);
  }

  render(){
    return (
      <View style={styles.outsideContainer}>
        <PostQuestionModal
          modalVisible={this.state.modalVisible}
          nextQuestionFunc={this.nextQuestion.bind(this)}
          price={this.props.gameData[this.state.question].price}
          correct={this.state.correctQuestion}
          prodLink={this.state.prodLink}
          nextQuestionFunc={this.nextQuestion.bind(this)}
          endGameFunc={this.endGame.bind(this)}
          lastQuestion={this.state.lastQuestion}/>
        <View style={styles.gameDataContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.bigText}>{Constants.getQuestionString(this.state.question + 1)}</Text>
          </View>
          <View style={styles.gameDataContainerLower}>
            <Text style={styles.medText}>{this.props.gameData[this.state.question].caption}</Text>
            <Image
              style={styles.imageStyle}
              source={{uri: this.props.gameData[this.state.question].imageURI}}
            />
            <Text style={styles.costText}>{Constants.formatCurrency(this.props.gameData[this.state.question].fakePrice)}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback onPress={() => this.answerQuestion(true)}>
            <View style={styles.hiLoButtons}>
              <Text style={styles.buttonText}>{Constants.HIGH_STRING}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.answerQuestion(false)}>
            <View style={styles.hiLoButtons}>
              <Text style={styles.buttonText}>{Constants.LOW_STRING}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    justifyContent:'space-between',
    backgroundColor: Constants.BACKGROUND_COLOR,
    padding: 15
  },
  gameDataContainer: {
    justifyContent:'space-between',
    flex: 1,
  },
  questionContainer : {
    borderBottomColor: Constants.ACCENT_COLOR,
    borderBottomWidth: 4,
    marginBottom: 100
  },
  gameDataContainerLower: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageStyle: {
    width: 250,
    height: 250,
    borderRadius:15,
    borderWidth:4,
    borderColor: Constants.ACCENT_COLOR
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15
  },
  hiLoButtons: {
    backgroundColor: Constants.ACCENT_COLOR,
    borderRadius:15,
    padding: 15,
    margin: 5,
    flex:1,
    alignItems: 'center',
  },
  medText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: Constants.TEXT_COLOR,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: Constants.TEXT_COLOR,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Constants.TEXT_COLOR,
  },
  costText: {
    fontWeight: 'bold',
    fontSize: 48,
    color: Constants.COST_TEXT_COLOR,
  },
});
