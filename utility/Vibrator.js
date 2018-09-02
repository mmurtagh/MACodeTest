import {Vibration} from 'react-native'
import * as Settings from './Settings'

/*
File with function used to vibrate device when answering a question
*/

const CORRECT_PATTERN = [0,250,100,250];
const WRONG_DURATION = 600;

/*
Vibrates the phone depending on the vibration settings and whether or not the answer is correct or incorrect

params:
    correct:    boolean idicating if the question was answered correctly
*/
export function answerVibrate(correct){
  if(Settings.getVibrationSetting()){
    pattern = CORRECT_PATTERN;
    if(!correct) pattern = WRONG_DURATION;
    Vibration.vibrate(pattern);
  }
}
