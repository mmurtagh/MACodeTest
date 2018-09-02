import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import * as Constants from '../utility/Constants'

const ICON_PATH = '../img/icon.png';

/*
Component class representing the end game screen.

--------------------
Props:
--------------------
  totalQuestions:         total questions that were in the completed game
  totalCorrect:           total questions answered correctly in the completed game
  backToMainMenuFunc:     function that triggers the main menu being shown. triggered by pressing the main menu button
*/

export default class GameEndScreen extends Component<Props>{

  render(){
    return (
      <View style={styles.outsideContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.scoreText}>{Constants.getScoreString(this.props.totalQuestions,this.props.totalCorrect)}</Text>
        </View>
        <View style={styles.outsideButtonContainer}>
          <View style={{flex:1}}>
            <TouchableNativeFeedback onPress={() => {this.props.backToMainMenuFunc()}}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{Constants.MAIN_MENU}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    justifyContent:'center',
    padding:15,
    backgroundColor:Constants.BACKGROUND_COLOR
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-evenly',
    alignItems: 'center',
    padding:15,
    backgroundColor:Constants.BACKGROUND_COLOR
  },
  outsideButtonContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    padding:15,
  },
  button: {
    backgroundColor: Constants.ACCENT_COLOR,
    borderRadius:15,
    padding: 15,
    alignItems: 'center',
    margin: 15
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Constants.TEXT_COLOR,
  },
  gameOverText: {
    fontWeight: 'bold',
    fontSize: 48,
    color: Constants.WRONG_COLOR,
  },
  scoreText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 48,
    color: Constants.TEXT_COLOR,
  }
});
