# MACodeTest
Market America Code Test - Matthew Murtagh

## Summary

For the coding test, I created a small interactive game using the shop.com search and product API. The user is presented with 10 questions about random products on shop.com and prompted to guess whether or not the actual value of the product is higher or lower than a presented value.
  
After answering, the user can see if they were correct, what the actual price was, and has an opportunity to open the product in question directly on shop.com. At the end of the game, the user can see their results, return to the main menu, and play another game.
  
## Target Platform

The application, while built in react native, was only tested and designed to be an Android application. The target Android SDK is version 26 (8.0.0 Oreo) while the minimum SDK version is 16 (4.1.X Jelly Bean).

## Build

1. Navigate to your project folder and clone the git repository

    `$ git clone https://github.com/mmurtagh/MACodeTest.git`

2. If you dont have it already [download Node.js](https://nodejs.org/en/download/)

3. In your project folder, install the project dependencies

    `$ npm install`
4. Launch your Android device emulator
5. In your project folder, run the react native application

    `$ react-native run-android`
    
## Design Process and Project Requirements

I started out my design process by investigating the various shop.com developer APIs. I manually investigated the JSON that was returned from the search and product APIs and noticed several interesting pieces of data: caption, imageURI, price, and productLink. From these I imagined a simple game in which you could guess the price of a product given the name and picture, and ran with the idea from there.

I started out by designing the layout of the three screens and modals: the intro screen, the in-game screen, and the post-game screen, as well as the instructions modal and post-question modal. Once they all looked acceptable, I began to program in the logic that allowed the application to function.

I also tried to implement in some native features in a way that didn't seem forced. I decided on using the following native Android features to enhance my application:

1. **Vibration**

   I used vibration to give a tactile response to answering questions. A correct answer is met with 2 quick buzzes, while an incorrect      answer is met with one long buzz.
2. **Linking**
    
   
