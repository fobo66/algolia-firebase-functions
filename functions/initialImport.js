#!/usr/bin/env node

const argv = require('yargs')
  .option('credential', {
    alias: 'c',
    description: 'Path to your service account key .json file',
    default: './serviceAccountCredentialKey.json',
    demandOption: 'Without this argument script cannot read your database',
    type: 'string',
  })
  .option('database', {
    alias: 'd',
    description: 'Firebase Database URL',
    demandOption: 'You should specify Firebase Database URL to import from',
    type: 'string',
  })
  .option('key', {
    alias: 'k',
    description: 'Algolia app admin key',
    demandOption: 'Script cannot write new items into Algolia app without this key. Use admin\'s key!',
    type: 'string',
  })
  .option('app', {
    alias: 'a',
    description: 'Algolia App ID',
    demandOption: 'You must specify Algolia app ID to import into',
    type: 'string',
  })
  .option('ref', {
    alias: 'r',
    description: 'Firebase Database reference to import from',
    demandOption: 'You must specify reference with data you want to import',
    type: 'string',
  })
  .option('index', {
    alias: 'i',
    description: 'Algolia new index name',
    demandOption: 'You must specify Algolia not already existing index name to import into',
    type: 'string',
  })
  .argv;

const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

const serviceAccountCredential = require(argv.credential);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredential),
  databaseURL: argv.database,
});
const algolia = algoliasearch(argv.app,
                              argv.key);

const refToImport = admin.database().ref(argv.ref);
const index = algolia.initIndex(argv.index);
refToImport.once('value', (snapshot) => {
  const objectsToIndex = [];
  snapshot.forEach((child) => {
    let childKey = child.key;
    let childData = child.val();
    childData.objectID = childKey;
    objectsToIndex.push(childData);
  });
  index.saveObjects(objectsToIndex, (err, content) => {
    if (!err) {
      process.stdout.write('Firebase -> Algolia import done');
      process.exit(0);
    } else {
      process.stderr.write('Something went wrong: ', err);
      process.exit(1);
    }
  });
});
