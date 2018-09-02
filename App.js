import React, {Component} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import Game from './components/Game'
import IntroScreen from './components/IntroScreen'
import LoadingScreen from './components/LoadingScreen'
import GameEndScreen from './components/GameEndScreen'
import * as Constants from './utility/Constants'
import * as Fetcher from './utility/Fetcher'
import * as Settings from './utility/Settings'

const screenState = {
  PRE_GAME: 0,
  IN_GAME: 1,
  POST_GAME: 2,
  LOADING: 3
};

/*
Wrapper component class for the entire app.
In charge of maintaining the high level screen state of the app and rendering the appropriate screens.
Also kicks off the loading of the vibration settings and the game data via the shop.com search API

--------------------
State:
--------------------
  gameData:         array of objects. Each object contains all the necessary data for an individual question. Loaded from the shop.com search API and passed to the Game component.
    prodID:         prodID of the item
    caption:        description of the item
    price:          the item's actual price
    fakePrice:      the fake price presented to the user
    imageURI:       link to the item's picture
  screenState:      the high level state of the app. determines which screen is rendered:
*/

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      gameData: [],
      screenState: screenState.LOADING
    };
    Settings.loadVibrationSetting(this.loadVibrationSettingCallback.bind(this));
  }

  /*
  callback function for the loading of the vibration settings via AsyncStorage
  unofficial start of the app since this is where the state is first changed to PRE_GAME
  */
  loadVibrationSettingCallback(){
    this.setState({
      screenState: screenState.PRE_GAME
    });
  }

  /*
  callback function for the loading the game data via the shop.com search API
  when called the screen state is set to IN_GAME and the gameData is passed to the Game component
  if an empty array is returned, there was an error and the state is returned in PRE_GAME and an error toast is shown
  */
  fetchGameDataCallBack(gameData){
    if(gameData.length > 0){
      this.setState({
        screenState: screenState.IN_GAME,
        gameData: gameData
      });
    }
    else{
      ToastAndroid.show(Constants.CANT_LOAD,ToastAndroid.LONG)
      this.setState({
        screenState: screenState.PRE_GAME
      });
    }
  }

  /*
  function called to kick off the starting of the game.
  sets the screen to loading, call the shop.com search API, and waits for a callback to continue
  */
  startGame(){
    this.setState({
      screenState: screenState.LOADING
    });
    Fetcher.fetchGameData(this.fetchGameDataCallBack.bind(this));
  }

  /*
  function called when the game is ended; triggers the screenState to be changed to POST_GAME
  passed to the Game component which is then passed to the PostQuestionModal component.
  */
  endGame(totalCorrect){
    this.setState({
      screenState: screenState.POST_GAME,
      totalCorrect: totalCorrect
    });
  }

  /*
  function called to return back to the main menu; triggers the screenState to be changed to PRE_GAME
  passed to the GmaeEndScreen and triggered on the "Main Menu" button
  */
  backToMainMenu(){
    this.setState({
      screenState: screenState.PRE_GAME
    });
  }

  /*
  generates the proper screen JSX depending on the screenState state
  */
  getCurrentScreenRender(){
    if(this.state.screenState == screenState.PRE_GAME){
      return(
        <IntroScreen startGameFunc={this.startGame.bind(this)}/>
      );
    }
    else if(this.state.screenState == screenState.IN_GAME){
      return(
        <Game endGameFunc={this.endGame.bind(this)} gameData={this.state.gameData} totalQuestions={this.state.gameData.length}/>
      );
    }
    else if(this.state.screenState == screenState.LOADING){
      return(
        <LoadingScreen/>
      );
    }
    else if(this.state.screenState == screenState.POST_GAME){
      return(
        <GameEndScreen totalQuestions={this.state.gameData.length} totalCorrect = {this.state.totalCorrect} backToMainMenuFunc={this.backToMainMenu.bind(this)}/>
      );
    }

  }

  render() {
    return(
      <View style={{flex:1}}>
        {this.getCurrentScreenRender()}
      </View>
    );
  }

}
