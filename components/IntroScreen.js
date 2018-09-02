import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, TouchableNativeFeedback, Switch} from 'react-native';
import * as Constants from '../utility/Constants'
import * as Settings from '../utility/Settings'
import InstructionsModal from './InstructionsModal'

const ICON_PATH = '../img/icon.png'
/*
Component class representing the main menu.

--------------------
Props:
--------------------
  startGameFunc: function that starts the game when called

--------------------
State:
--------------------
  showInstructions:   boolean indicating if the InstructionsModal should be visible
  vibration:          boolean indicating if the vibration should be on or off
  saving:             boolean indicating if the vibration settings are currently being saved
*/
export default class IntroScreen extends Component<Props>{

  constructor(props){
    super(props);
    this.state = {
      showInstructions: false,
      vibration: Settings.getVibrationSetting(),
      saving: false
    };
  }

  /*
  Sets the showInstructions state to the passed in parameter. Affects whether or not the instructions modal is shown.

  params:
    show:   boolean the showInstructions state is set to
  */
  toggleInstructions(show){
    this.setState({
      showInstructions: show
    });
  }

  /*
  Closes the instructions modal
  Passed to the InstructionsModal and tirggered by the "Got It" button
  */
  closeInstructions(){
    this.toggleInstructions(false);
  }

  /*
  Callback function called by Settings.js after the vibration settings were successfully saved with AsyncStorage
  */
  saveVibrationSettingCallback(){
    this.setState({
      saving: false
    });
  }

  /*
  called when the vibration switch is switched.
  if vibration settings are still being saved, nothing happens
  otherwise it calls the Settings.js function to save the new vibration setting via AsyncStorage and sets the new state
  sets the state the following way:
    saving: flipped to true
    vibration: changed to the opposite of whatever it was before the call. changes the value of the switch
  */
  flipVibrationSwitch(){
    if(this.state.saving) return;
    var newVibrationSetting = !this.state.vibration;
    this.setState({
      saving: true,
      vibration: newVibrationSetting
    });
    Settings.saveVibrationSetting(newVibrationSetting,this.saveVibrationSettingCallback.bind(this));
  }

  render(){
    return (
      <View style={styles.outsideContainer}>
        <InstructionsModal
          modalVisible={this.state.showInstructions}
          gotItFunc={this.closeInstructions.bind(this)}/>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require(ICON_PATH)}
          />
        </View>
        <View style={styles.outsideButtonContainer}>
          <TouchableNativeFeedback onPress={() => {this.props.startGameFunc()}}>
            <View style={styles.modalButton}>
              <Text style={styles.medText}>{Constants.PLAY_GAME}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => {this.toggleInstructions(true)}}>
            <View style={styles.modalButton}>
              <Text style={styles.medText}>{Constants.INSTRUCTIONS}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.vibrationSettingsOutsideContainer}>
            <Switch onValueChange={this.flipVibrationSwitch.bind(this)} onTintColor={Constants.ACCENT_COLOR} value={this.state.vibration} />
            <Text style={styles.vibrationText}>{Constants.getVibrationSettingString(this.state.vibration)}</Text>
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
  outsideButtonContainer: {
    flex: 1,
    justifyContent:'flex-start',
    padding:15,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    padding:15,
  },
  modalButton: {
    backgroundColor: Constants.ACCENT_COLOR,
    borderRadius:15,
    padding: 15,
    alignItems: 'center',
    margin: 15
  },
  medText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Constants.TEXT_COLOR,
  },
  vibrationText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Constants.TEXT_COLOR,
    marginLeft: 5
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15
  },
  vibrationSettingsOutsideContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 15
  },
});
