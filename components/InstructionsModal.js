import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback, Modal, Linking} from 'react-native';
import * as Constants from '../utility/Constants'

/*
Component class representing instructions modal.

--------------------
Props:
--------------------
  modalVisible:         boolean determining if the modal is visible
  gotItFunc:            function used to dismiss the modal
*/

export default class InstructionsModal extends Component<Props>{

  render(){
    return (
      <Modal animationType="fade" transparent={true} visible={this.props.modalVisible} onRequestClose={this.props.gotItFunc}>
        <View style={styles.outsideContainer}>
          <View style={styles.spacingView}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.instructionsText}>{Constants.INSTRUCTIONS_TEXT}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
              <TouchableNativeFeedback onPress={() => {this.props.gotItFunc()}}>
                <View style={styles.modalButton}>
                  <Text style={styles.medText}>{Constants.GOT_IT}</Text>
                </View>
              </TouchableNativeFeedback>
              </View>
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
  modalButton: {
    backgroundColor: Constants.ACCENT_COLOR,
    borderRadius:15,
    padding: 15,
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  instructionsText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Constants.TEXT_COLOR,
    marginBottom: 15
  },
  medText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Constants.TEXT_COLOR,
  },
});
