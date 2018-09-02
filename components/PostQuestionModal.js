import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback, Modal, Linking} from 'react-native';
import * as Constants from '../utility/Constants'
/*
Component class representing popup screen that is shown after answering a question.

--------------------
Props:
--------------------
  correct:            boolean indicating if the question was answered correctly
  prodLink:           link to the shop.com product page for the current product
  lastQuestion:       boolean indicating if this is the last question
  endGameFunc:        function used to end the game and trigger the end game screen
  nextQuestionFunc:   function used to progess to the next question
*/

export default class PostQuestionModal extends Component<Props>{


  /*
  Function used to return the JSX for the answer response string text ("WRONG!" or "CORRECT!") depending on the correct prop
  */
  getAnswerResponseText(){
    var string = Constants.CORRECT_STRING;
    var style = styles.correctText;
    if(!this.props.correct) {
      string = Constants.WRONG_STRING;
      style = styles.wrongText;
    }
    return (
      <Text style={style}>{string}</Text>
    );
  }

  /*
  If a product link has been returned by the shop.com product API, opens the product page using device's default browser
  */
  linkIfHaveURI(){
    if(this.props.prodLink != "") Linking.openURL(this.props.prodLink);
  }

  /*
  Generates the JSX for the "Next Question" or "See Results" button depending on the lastQuestion prop
  */
  nextQuestionOrSeeResultsButton(){
    if(this.props.lastQuestion){
      return (
        <Text style={styles.medText}>{Constants.SEE_RESULTS}</Text>
      );
    }
    else{
      return(
        <Text style={styles.medText}>{Constants.NEXT_QUESTION}</Text>
      );
    }
  }

  /*
  Function called to progress the game.
  Triggered by the "Next Question" or "See Results" buttons
  If this was the last question, endGameFunc is called, otherwise nextQuestionFunc is called
  */
  continueGame(){
    if(this.props.lastQuestion) this.props.endGameFunc();
    else this.props.nextQuestionFunc();
  }

  render(){
    return (
      <Modal animationType="fade" transparent={true} visible={this.props.modalVisible} onRequestClose={this.props.nextQuestionFunc}>
        <View style={styles.outsideContainer}>
          <View style={styles.spacingView}></View>
          <View style={styles.contentContainer}>
            {this.getAnswerResponseText()}
            <Text style={styles.medText}>{Constants.THIS_ITEM_ACT_COSTS}</Text>
            <Text style={styles.costText}>{Constants.formatCurrency(this.props.price)}</Text>
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback onPress={() => this.continueGame()}>
                <View style={styles.modalButton}>
                  {this.nextQuestionOrSeeResultsButton()}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => this.linkIfHaveURI()}>
                <View style={styles.modalButton}>
                  <Text style={styles.medText}>{Constants.SHOP}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={styles.spacingView}></View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    justifyContent:'space-between',
     padding:15,
    backgroundColor:'rgba(0,0,0,.5)'
  },
  spacingView: {
    flex: 1,
    justifyContent:'space-between'
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems:'center',
    borderColor:Constants.ACCENT_COLOR,
    backgroundColor:Constants.BACKGROUND_COLOR,
    borderWidth:5,
    padding:15,
    borderRadius: 15
  },
  correctText: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Constants.COST_TEXT_COLOR
  },
  wrongText: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Constants.WRONG_COLOR
  },
  modalButton: {
    backgroundColor: Constants.ACCENT_COLOR,
    borderRadius:15,
    padding: 15,
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  medText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Constants.TEXT_COLOR,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15
  },
  costText: {
    fontWeight: 'bold',
    fontSize: 48,
    color: Constants.COST_TEXT_COLOR,
  },
});
