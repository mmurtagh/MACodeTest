import {AsyncStorage} from 'react-native'

const VIBRATION_SETTINGS_KEY = 'vibration';
const TRUE_STRING = 'true';
const FALSE_STRING = 'false';

var vibrationSetting;

/*
File containing functions using AsyncStorage to save the vibration settings for the application
*/

/*
Intial load of the vibration settings. Initializes the vibrationSetting var and allows usage of the getVibrationSetting function call.

params:
  callBack:   callBack function to be called when load is finished
*/
export function loadVibrationSetting(callBack){
  AsyncStorage.getItem(VIBRATION_SETTINGS_KEY , (err,store) => {
    vibrationSetting = true;
    if(store == FALSE_STRING){
      vibrationSetting=false;
    }
    callBack();
  });
}

/*
  Saves the new vibration settings using AsyncStorage

  params:
    on:         boolean indicating if the vibration is on
    callBack:   callBack function to be called when save is finished
*/
export function saveVibrationSetting(on, callBack){
  var saveString = TRUE_STRING;
  if(!on) saveString = FALSE_STRING;
  AsyncStorage.setItem(VIBRATION_SETTINGS_KEY, saveString, (err) => {
    vibrationSetting=on;
    callBack();
  });
}

/*
Returns the vibration setting
*/
export function getVibrationSetting(){
  return vibrationSetting;
}
