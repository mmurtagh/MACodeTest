# MACodeTest
Market America Code Test - Matthew Murtagh

## Summary

For the coding test, I created a small interactive game using the shop.com search and product API. The user is presented with 10 questions about random products on shop.com and prompted to guess whether or not the actual value of the product is higher or lower than a presented value.
  
After answering, the user can see if they were correct, what the actual price was, and they are given an opportunity to open the product in question directly on shop.com. At the end of the game, the user can see their results, return to the main menu, and play another game.
  
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

* **Linking**
    
    After answering a question, the user can click on the "Shop" button to open up the product on shop.com using their device's default 
    browser.
* **Vibration**

   I used vibration to give a tactile response to answering questions. A correct answer is met with 2 quick buzzes, while an incorrect      answer is met with one long buzz.
* **AsyncStorage**
    
    If the user doesn't want the vibration, they can turn it off using a switch on the intro screen. The value of this switch is setting     on the device via the native Android implementation of AsyncStorage (either RocksDB or SQLite). This value is retained and reloaded     across application processes.
* **Toast Messages**
    
    If the application fails to load data from the shop.com search API (due to networking issues) the application is reverted back to       the intro screen. This could be confusing for the user, so I used an Android Toast message to say "Could not load game data." in         this case.
    
## Limitations

* **Slow picture loading**

   For some reason, Image components linked to the imageURI returned from the shop.com search API load noticably slow. I tried setting      the defaultSource property on the image to a loading image to make the app feel more responsive, but it doesn't seem to work on          Android builds. In future iterations, the loading problem should be investigated more and a solution for the placeholder image should    be found (there seems to be several 3rd party libraries addressing this issue, but I did not look into them heavily).

* **Limited Categories**

   There are 5 search terms used to determine the category of an individual game: furniture, electronics, vitamins, hiking, and kids        toys. It would be optimal to allow to user to specify their own category, but I don't quite understand the data promises (especially    for the searchItems category) made from the search API and how to handle exceptions gracefully. For example, searching for shoes        returns an empty searchItems object.

