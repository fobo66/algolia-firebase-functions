# Algolia <-> Firebase cloud functions

[![npm](https://img.shields.io/npm/v/algolia-firebase-functions.svg)](https://www.npmjs.com/package/algolia-firebase-functions)
![Tests](https://github.com/fobo66/algolia-firebase-functions/workflows/Tests/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e0db542266204846b3a47018839453f4)](https://www.codacy.com/manual/fobo66/algolia-firebase-functions?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fobo66/algolia-firebase-functions&amp;utm_campaign=Badge_Grade)

Useful library to keep your Firebase Database of Firebase Cloud Firestore data in sync with [Algolia](https://algolia.com) for easy search.

Starting from version 2.0, this library supports Cloud Functions v1.0. If you need to support beta Cloud Functions, use version 1.0.3 instead.

Starting from version 4.0.0, this library supports Node >= 10 and no longer supports Node 8. If you still need to support Node 8, use version 3.3.0 instead.

Starting from version 4.1.2, this library supports only ES6 modules or Typescript.

Starting from version 5.0.0, this library supports Node >= 14 and no longer supports Node 10 and 12. If you still need to support Node 10 or 12, use version 4.1.2 instead.

## Installation

In your `functions` directory:

``` bash
 npm install --save algolia-firebase-functions
```

## Usage

To use this library in your Functions, first of all you need to set environmental variables for Algolia to initialize connection. Grab your API keys [here](https://algolia.com/dashboard) first.

Open Terminal, go to your `functions` directory and input these commands:

``` bash
firebase functions:config:set algolia.app="<YOUR-ALGOLIA-APP-ID>"
firebase functions:config:set algolia.key="<YOUR-ALGOLIA-APP-PUBLIC-KEY>"
firebase functions:config:set algolia.index="<YOUR-ALGOLIA-INDEX-NAME>"
```

Then, in your functions' `index.js` file, paste the following lines:

``` js
import { config, database } from 'firebase-functions';
import admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';
import { syncAlgoliaWithFirebase } from 'algolia-firebase-functions';

admin.initializeApp(config().firebase);
const algolia = algoliasearch(functions.config().algolia.app,
                              functions.config().algolia.key);
const index = algolia.initIndex(functions.config().algolia.index);


export const syncAlgoliaFunction = database.ref('/myRef/{childRef}').onWrite(
   (change, context) => syncAlgoliaWithFirebase(index, change)
)

```

If you're using [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/), you can use the following code:

```js
import { firestore } from 'firebase-functions';
import { syncAlgoliaWithFirestore } from 'algolia-firebase-functions';

export const syncAlgoliaFunction = firestore.document('/myDocument/{childDocument}').onWrite(
   (change, context) => syncAlgoliaWithFirestore(index, change);
);
```

And redeploy your functions:

```bash
firebase deploy --only functions
```

Now, after any changes made with your references, it will be sent to Algolia, so you'll be sure that users can search on the newest data.
