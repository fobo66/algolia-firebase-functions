//    Copyright 2017 Andrey Mukamolov <fobo66@protonmail.com>
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

/**
 * If a patch updates a nested object,
 * it's necessary to parse it to an array
 * @param {*} dataVal - a JavaScript value from a DataSnapshot
 * @returns {boolean} - if the object is nested or not
 */
const hasManyObjects = (dataVal) => {
  const val = Object.values(dataVal);
  return val[0] instanceof Object;
};

/**
 * Forging object for uploading to Algolia
 * Algolia requires "objectID" field in every object
 * If not specified, it will generate it automatically
 * To keep objects in sync, we specify objectID by ourselves
 *
 * @param {DataSnapshot} dataSnapshot - Child snapshot
 */
const prepareObjectToExporting = (dataSnapshot) => {
  const snapVal = dataSnapshot.val();
  if (hasManyObjects(snapVal)) {
    return Object.entries(snapVal).map(o => ({ objectID: o[0], ...o[1] }));
  }
  const object = snapVal;
  object.objectID = dataSnapshot.key;
  return [object];
};

/**
 * Convenience wrapper over Algolia's SDK function for saving objects
 *
 * @param {functions.database.DataSnapshot} dataSnapshot - Child snapshot
 * @param {algolia.AlgoliaIndex} index - Algolia index
 */
const updateExistingOrAddNew = (dataSnapshot, index) => index.saveObjects(prepareObjectToExporting(dataSnapshot));

/**
 * Convenience wrapper over Algolia's SDK function for deletion of the objects
 *
 * @param {functions.database.DataSnapshot} dataSnapshot - Child snapshot
 * @param {algolia.AlgoliaIndex} index - Algolia index
 */
const removeObject = (dataSnapshot, index) => index.deleteObject(dataSnapshot.key);

/**
 * Determine whether it's deletion or update or insert action
 * and send changes to Algolia
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {algolia.AlgoliaIndex} index - Algolia index
 * @param {functions.Change} change - Firebase Realtime database change
 */
exports.syncAlgoliaWithFirebase = (index, change) => {
  if (!change.after.exists()) {
    return removeObject(change.before, index);
  }

  return updateExistingOrAddNew(change.after, index);
};
