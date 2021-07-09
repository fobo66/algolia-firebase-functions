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

import { firestore } from 'firebase-admin';
import { Change } from 'firebase-functions';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';
import { SearchIndex } from 'algoliasearch';
import { WaitablePromise } from '@algolia/client-common';
import { ChunkedBatchResponse } from '@algolia/client-search';

/**
 * If a patch updates a nested object,
 * it's necessary to parse it to an array
 * @param {*} dataVal - a JavaScript value from a DataSnapshot
 * @returns {boolean} - if the object is nested or not
 */
const hasManyObjects = (dataVal: unknown): boolean => {
  const val = Object.values(dataVal);
  return val[0] instanceof Object;
};

/**
 * Forging object for uploading to Algolia
 * Algolia requires "objectID" field in every object
 * If not specified, it will generate it automatically
 * To keep objects in sync, we specify objectID by ourselves
 *
 * @param {string} id - Firebase Database key or Firestore id
 * @param {any} data - Child snapshot's data
 */
// any is set here to be able to assign objectID to the value explicitly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareObjectToExporting = (id: string, data: any) => {
  if (hasManyObjects(data)) {
    return Object.entries(data).map((o: unknown) => ({ objectID: o[0], ...o[1] }));
  }
  const object = data;
  object.objectID = id;
  return [object];
};

/**
 * Convenience wrapper over Algolia's SDK function for saving objects
 *
 * @param {functions.database.DataSnapshot} dataSnapshot - Child snapshot
 * @param {algolia.AlgoliaIndex} index - Algolia index
 */
function updateExistingOrAddNewFirebaseDatabaseObject(
  dataSnapshot: DataSnapshot,
  index: SearchIndex
): Readonly<WaitablePromise<ChunkedBatchResponse>> {
  return index.saveObjects(
    prepareObjectToExporting(dataSnapshot.key, dataSnapshot.val()),
  );
}

/**
 * Convenience wrapper over Algolia's SDK function for saving objects
 *
 * @param {functions.firestore.DocumentSnapshot} dataSnapshot - Child snapshot
 * @param {SearchIndex} index - Algolia index
 */
function updateExistingOrAddNewFirestoreObject(
  dataSnapshot: firestore.DocumentSnapshot,
  index: SearchIndex
): Readonly<WaitablePromise<ChunkedBatchResponse>> {
  return index.saveObjects(
    prepareObjectToExporting(dataSnapshot.id, dataSnapshot.data()),
  );
}

/**
 * Convenience wrapper over Algolia's SDK function for deletion of the objects
 *
 * @param {string} id - Firebase Database key or Firestore id
 * @param {SearchIndex} index - Algolia index
 */
const removeObject = (id: string, index: SearchIndex) => index.deleteObject(id);

/**
 * Determine whether it's deletion or update or insert action
 * and send changes to Algolia
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {SearchIndex} index - Algolia index
 * @param {functions.Change<DataSnapshot>} change - Firebase Realtime database change
 */
export function syncAlgoliaWithFirebase(
  index: SearchIndex,
  change: Change<DataSnapshot>): Readonly<WaitablePromise<unknown>> {
  if (!change.after.exists()) {
    return removeObject(change.before.key, index);
  }

  return updateExistingOrAddNewFirebaseDatabaseObject(change.after, index);
}

/**
 * Determine whether it's deletion or update or insert action
 * and send changes to Algolia
 * @param {SearchIndex} index - Algolia index
 * @param {Change<firestore.DocumentSnapshot>} change - Firestore change
 */
export function syncAlgoliaWithFirestore(
  index: SearchIndex,
  change: Change<firestore.DocumentSnapshot>): Readonly<WaitablePromise<unknown>> {
  if (!change.after.exists) {
    return removeObject(change.before.id, index);
  }

  return updateExistingOrAddNewFirestoreObject(change.after, index);
}
