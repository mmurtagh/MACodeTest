import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import * as Constants from '../utility/Constants'

export default class IntroScreen extends Component<Props>{

  /*
  Component class representing the loading screen.
  */

  render(){
    return (
      <View style={styles.outsideContainer}>
        <ActivityIndicator size='large' color = {Constants.ACCENT_COLOR}/>
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
});
