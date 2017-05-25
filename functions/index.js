// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const algoliasearch = require('algoliasearch');

// admin.initializeApp(functions.config().firebase);
// const algolia = algoliasearch(functions.config().algolia.app,
//                               functions.config().algolia.key);
// const index = algolia.initIndex(functions.config().algolia.index);

const promisify = require('es6-promisify');

/**
 * Forging object for uploading to Algolia
 * Algolia requires "objectID" field in every object
 * If not specified, it will generate it automatically
 * To keep objects in sync, we specify objectID by ourselves
 *
 * @param {admin.database.DataSnapshot} Child snapshot
 */
const prepareObjectToExporting = (dataSnapshot) => {
  const object = dataSnapshot.val();
  object.objectID = dataSnapshot.key;
  return object;
};

/**
 * Promisified version of Algolia's SDK function
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {admin.database.DataSnapshot} Child snapshot
 * @param {algolia.AlgoliaIndex} Algolia index
 */
const updateExistingOrAddNew = (dataSnapshot, index) => {
  const saveObject = promisify(index.saveObject, index);
  return saveObject(prepareObjectToExporting(dataSnapshot));
};

/**
 * Promisified version of Algolia's SDK function
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {admin.database.DataSnapshot} Child snapshot
 * @param {algolia.AlgoliaIndex} Algolia index
 */
const removeObject = (dataSnapshot, index) => {
  const deleteObject = promisify(index.deleteObject, index);
  return deleteObject(dataSnapshot.key);
};

/**
 * Determine whether it's deletion or update or insert action
 * and send changes to Algolia
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {algolia.AlgoliaIndex} Algolia index
 * @param {cloud-functions.Event<DeltaSnapshot>} Event emitted by cloud function
 */
exports.syncAlgoliaWithFirebase = (index, event) => {
  if (!event.data.exists()) {
    return removeObject(event.data, index);
  }

  return updateExistingOrAddNew(event.data, index);
};
