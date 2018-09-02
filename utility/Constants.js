
/*
File containing string constants, string generating functions, and other constants used throughout the app
*/

export const WRONG_STRING = 'WRONG!';
export const CORRECT_STRING = 'CORRECT!';
export const HIGH_STRING = 'Higher';
export const LOW_STRING = 'Lower';
export const NEXT_QUESTION = 'Next Question';
export const SHOP = 'Shop';
export const THIS_ITEM_ACT_COSTS = 'This item actually costs:';
export const PLAY_GAME = 'Play Game';
export const INSTRUCTIONS = 'Instructions';
export const INSTRUCTIONS_TEXT = 'Each question will present you with a picture and description of an item along with a fake price.\n\nUse the "Higher" and "Lower" buttons to guess if the item\'s actual value is higher or lower than the fake price.\n\nAnswer all 10 questions to complete the game.';
export const GOT_IT = 'Got It';
export const MAIN_MENU = 'Main Menu';
export const SEE_RESULTS = 'See Results';
export const CANT_LOAD = 'Could not load game data.';

export const BACKGROUND_COLOR = '#586F7C';
export const ACCENT_COLOR = '#A7ADC6';
export const TEXT_COLOR = '#0B3142';
export const COST_TEXT_COLOR = '#36C43E';
export const WRONG_COLOR = '#AF0A0A';

const QUESTION = 'Question';
const SCORE = 'Score:\n';
const VIBRATION_ON = 'Vibration ON';
const VIBRATION_OFF = 'Vibration OFF';

/*
Generates the string "Question X" where is the the number passed in. Used at the top of the Game screen.

params:
  number: the question number
*/
export function getQuestionString(number){
  return QUESTION + ' ' + number;
}

/*
Generates the "Score\nX/Y string used in the post game screen"

params:
  totalQuestions: the total number of questions
  totalCorrect:   the number of correct questions
*/
export function getScoreString(totalQuestions,totalCorrect){
  return SCORE + totalCorrect + '/' + totalQuestions;
}

/*
Generates the "Vibration ON/OFF" string used in the intro screen"

params:
  on:   boolean indicating if the vibration settings are on
*/
export function getVibrationSettingString(on){
  if(on) return VIBRATION_ON;
  else return VIBRATION_OFF;
}

/*
Generates a USD formatted string for a given amount

params:
  amount:   the amount to format
*/
export function formatCurrency(amount){
  var num = amount.toFixed(2).toString()
  var dollars = num.substring(0,num.length-3)
  var cents = num.substring(num.length-2,num.length)
  var commaDollars = ""
  var count = 0
  for(i = dollars.length-1; i >=0; i--){
    if(count%3 == 0 && count > 0){
       commaDollars = "," + commaDollars
    }
    count++;
    commaDollars=dollars.charAt(i) + commaDollars
  }
  return '$' + commaDollars + '.' + cents
}
