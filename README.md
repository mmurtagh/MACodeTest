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
    
## High Level Technical Overview
   
The application is generally split into two types of files:
### Components
  These are react native component files that render/style JSX and maintain the state of the application found in the `./components` subfolder
  
#### App.js
  
* The highest level wrapper component for all other components
* Maintains the game screen state which determines which of the other screen components are rendered
* Kicks off the loading of the vibration settings from AsyncStorage and the fetching of the game data via the shop.com search API

  
#### Game.js
  
  * The component responsible for rendering and maintaining the state of the game screen.
  * Manipulates state to show relevant question data and has functions to progress the game forward
  * Responsible for querying the shop.com product API.

#### IntroScreen.js

  * The component responsible for rendering and mainining the state of the intro screen
  * Responsible for interacting with Settings.js to save vibration settings.
  
  
#### GameEndScreen.js
  
  * The component responsible for rendering the post game screen
  
#### LoadingScreen.js

  * The component responsible for rendering the loading screen consisting of an ActivityIndicator
  
#### InstructionsModal.js

  * Component responsible for rendering the instructions modal popup triggered by the "Instructions" button on the intro screen

#### PostQuestionModal.js

  * Component responsible for rendering the post question modal triggered by answering a question in the Game screen
  * Conditionally loads different button text and triggers different game-progressing functions depending on the question number
  * Contains a shop button that links to the shop.com product page
  
### Utility
  These are various files containing functions/constants for general application utility found in the `./utility` subfolder
  
#### Constants.js

  * Contains constants usable throughout the app
  * Abstracts away all user viewed strings into constants to be referenced instead of hard coding
  * Contains functions to generate user viewed strings
  
#### Fetcher.js

  * Contains functions used to fetch data from the shop.com search and product APIs
  
#### Settings.js
  
  * Contains functions used to load/save the apps vibration settings using AsyncStorage
  
#### Vibrator.js

  * Contains a function used to appropriately vibrate the device with respect to the vibration settings and whether or not the question was answered correctly.
  
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
    
## Strengths

* **Complete Application**

  My application is intuitive and somewhat fun to use. It is a complete application and there doesn't seem to be any piece missing. Everything flows logically and smoothly.
  
* **Modual and Reusable Code**

  I structured my files to be modual, intuitive, and reusable. The Constants file extracts all of the user displayed strings abstract away all hardcoded strings for easy maintainence, debugging, and possible tranlsation. The other utility classes abstract cumbersome logic away from the flow of the app logic and keeps the code readable and maintainable. Furthermore, the components classes all encapsulate a single component and their use case is clear and concise. 
  
* **Takes Advantage of Mobile Platform**

  I made an effort to not only make my application run on a mobile platform, but to make it feel like it belongs running on a mobile platform. It isn' simply a web application that can run on your phone; I used design, styling, and native mobile features to make the application feel litke it belongs running on a mobile device.
    
## Limitations

* **Slow Picture Loading**

   For some reason, Image components linked to the imageURI returned from the shop.com search API load noticably slow. I tried setting      the defaultSource property on the image to a loading image to make the app feel more responsive, but it doesn't seem to work on          Android builds. In future iterations, the loading problem should be investigated more and a solution for the placeholder image should    be found (there seems to be several 3rd party libraries addressing this issue, but I did not look into them heavily).
* **Limited Categories**

   There are 5 search terms used to determine the category of an individual game: furniture, electronics, vitamins, hiking, and kids        toys. It would be optimal to allow to user to specify their own category, but I don't quite understand the data promises (especially    for the searchItems category) made from the search API and how to handle exceptions gracefully. For example, searching for shoes        returns an empty searchItems object.
* **Lack of Framework**

  I didn't use a framework such as Redux in this application. While I tried to make the code as modular and reusable as possible, it won't scale as well and the data flow is somewhat arbitrary to my personal coding style.
