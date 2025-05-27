# Algolia <-> Firebase cloud functions

[![npm](https://img.shields.io/npm/v/algolia-firebase-functions.svg)](https://www.npmjs.com/package/algolia-firebase-functions)
![Tests](https://github.com/fobo66/algolia-firebase-functions/workflows/Tests/badge.svg)
[![Docs](https://img.shields.io/badge/docs-orange)](https://fobo66.github.io/algolia-firebase-functions/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e0db542266204846b3a47018839453f4)](https://www.codacy.com/manual/fobo66/algolia-firebase-functions?utm_source=github.com&utm_medium=referral&utm_content=fobo66/algolia-firebase-functions&utm_campaign=Badge_Grade)

Useful library to keep your [Firebase Database](https://firebase.google.com/docs/database) of [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) data in sync with [Algolia](https://algolia.com) for easy search.

Starting from version 2.0, this library supports Cloud Functions v1.0. If you need to support beta Cloud Functions, use version 1.0.3 instead.

Starting from version 4.0.0, this library supports Node >= 10 and no longer supports Node 8. If you still need to support Node 8, use version 3.3.0 instead.

Starting from version 4.1.2, this library supports only ES6 modules or Typescript.

Starting from version 5.0.0, this library supports Node >= 14 and no longer supports Node 10 and 12. If you still need to support Node 10 or 12, use version 4.1.2 instead.

Starting from version 6.0.0, this library uses Algolia SDK v5 and supports Node version 18 and up.

## Installation

In your `functions` directory:

```bash
 npm install --save algolia-firebase-functions
```

## Usage

To use this library in your Functions, first of all you need to set environmental variables for Algolia to initialize connection. Grab your API keys [here](https://algolia.com/dashboard) first.

Open Terminal, go to your `functions` directory and input these commands:

```bash
firebase functions:config:set algolia.app="<YOUR-ALGOLIA-APP-ID>"
firebase functions:config:set algolia.key="<YOUR-ALGOLIA-APP-PUBLIC-KEY>"
firebase functions:config:set algolia.index="<YOUR-ALGOLIA-INDEX-NAME>"
```

Then, in your functions' `index.js` file, paste the following lines:

```js
import { config, database } from "firebase-functions";
import admin from "firebase-admin";
import { searchClient } from "@algolia/client-search";
import { syncAlgoliaWithFirebase } from "algolia-firebase-functions";

admin.initializeApp(config().firebase);
const algolia = searchClient(
  functions.config().algolia.app,
  functions.config().algolia.key,
);
const index = functions.config().algolia.index;

export const syncAlgoliaFunction = database
  .ref("/myRef/{childRef}")
  .onWrite((change, context) =>
    syncAlgoliaWithFirebase(algolia, index, change),
  );
```

If you're using [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/), you can use the following code:

```js
import { firestore } from 'firebase-functions';
import { syncAlgoliaWithFirestore } from 'algolia-firebase-functions';

export const syncAlgoliaFunction = firestore.document('/myDocument/{childDocument}').onWrite(
   (change, context) => syncAlgoliaWithFirestore(algolia, index, change);
);
```

And redeploy your functions:

```bash
firebase deploy --only functions
```

Now, after any changes made with your references, it will be sent to Algolia, so you'll be sure that users can search on the newest data.
