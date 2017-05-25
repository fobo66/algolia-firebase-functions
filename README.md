# Algolia <-> Firebase cloud functions

Useful library to make your Firebase Database data easily searchable by [Algolia](https://algolia.com).
It also has command-line tool for first-time synchronization. You can either use wizard for constructing
 simple .sh file or directly pass arguments to synchronization script.

## Installation

In your `functions` directory:

``` npm i --save algolia-firebase-functions ```

## Usage

To use it in your functions, first you need to set environmental variables for Algolia to get to know where to connect
Open Terminal, go to your `functions` directory and input these commands:

``` bash
firebase functions:config:set algolia.app="<YOUR-ALGOLIA-APP-ID>"
firebase functions:config:set algolia.key="<YOUR-ALGOLIA-APP-PUBLIC-KEY>"
```
Then, in your functions' `index.js` file, paste the following lines:

``` js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const algoliaFunctions = require('algolia-firebase-functions');

admin.initializeApp(functions.config().firebase);
const algolia = algoliasearch(functions.config().algolia.app,
                              functions.config().algolia.key);
 const index = algolia.initIndex(functions.config().algolia.index);

 exports.syncAlgoliaWithFirebase = functions.database.ref("/myref/{childRef}").onWrite((event) => {
    return algoliaFunctions.syncAlgoliaWithFirebase(index, event);
 });
```
