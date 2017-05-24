// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const algoliasearch = require('algoliasearch');

// admin.initializeApp(functions.config().firebase);
// const algolia = algoliasearch(functions.config().algolia.app,
//                               functions.config().algolia.key);
// const index = algolia.initIndex(functions.config().algolia.index);

const Promise = require('bluebird');

const prepareObjectToExporting = (dataSnapshot) => {
  const object = dataSnapshot.val();
  object.objectID = dataSnapshot.key;
  return object;
};

const updateExisting = (dataSnapshot, index) => {
  const saveObject = Promise.promisify(index.saveObject, {
    context: index,
  });
  return saveObject(prepareObjectToExporting(dataSnapshot));
};

const removeObject = (dataSnapshot, index) => {
  const deleteObject = Promise.promisify(index.deleteObject, {
    context: index,
  });
  return deleteObject(dataSnapshot.key);
};

exports.syncAlgoliaWithFirebase = (index, event) => {
  if (!event.data.exists()) {
    return removeObject(event.data, index);
  }

  return updateExisting(event.data, index);
};
