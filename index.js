//    Copyright 2017 Andrey Mukamolow <fobo66@protonmail.com>
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

const { promisify } = require('es6-promisify');
const { entries } = require('object.entries').implementation;
const { values } = require('object.values').implementation;

/**
 * If a patch updates a nested object,
 * it's necessary to parse it to an array
 * @param {*} dataVal - a JavaScript value from a DataSnapshot
 * @returns {boolean} - if the object is nested or not
 */
const hasManyObjects = (dataVal) => {
  const val = values(dataVal);
  return val[0] instanceof Object;
};

/**
 * Forging object for uploading to Algolia
 * Algolia requires "objectID" field in every object
 * If not specified, it will generate it automatically
 * To keep objects in sync, we specify objectID by ourselves
 *
 * @param {admin.database.DataSnapshot} Child snapshot
 */
const prepareObjectToExporting = (dataSnapshot) => {
  const snapVal = dataSnapshot.val();
  if (hasManyObjects(snapVal)) {
    return entries(snapVal).map(o => Object.assign({ objectID: o[0] }, o[1]));
  }
  const object = snapVal;
  object.objectID = dataSnapshot.key;
  return [object];
};

/**
 * Promisified version of Algolia's SDK function
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {admin.database.DataSnapshot} Child snapshot
 * @param {algolia.AlgoliaIndex} Algolia index
 */
const updateExistingOrAddNew = (dataSnapshot, index) => {
  const saveObject = promisify(index.saveObjects.bind(index));
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
  const deleteObject = promisify(index.deleteObjects.bind(index));
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
