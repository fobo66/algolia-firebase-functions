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

import { Change } from "firebase-functions";
import { DataSnapshot } from "firebase-functions/v2/database";
import { DocumentSnapshot } from "firebase-functions/v2/firestore";
import { SearchClient, BatchResponse } from "@algolia/client-search";
import { DocumentData } from "firebase-admin/firestore";

/**
 * If a patch updates a nested object,
 * it's necessary to parse it to an array
 * @param {*} dataVal - a JavaScript value from a DataSnapshot
 * @returns {boolean} - if the object is nested or not
 */
// any is coming from Realtime Database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasManyObjects = (dataVal: DocumentData | any): boolean => {
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
 * @param {DocumentData | any} data - Child snapshot's data
 */
// any is coming from Realtime Database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareObjectToExporting(id: string, data: DocumentData | any) {
  if (hasManyObjects(data)) {
    return Object.entries(data as Record<string, unknown>).map((o) => ({
      objectID: o[0],
      ...(o[1] as Record<string, unknown>),
    }));
  }
  const object = data;
  object.objectID = id;
  return [object];
}

/**
 * Convenience wrapper over Algolia's SDK function for saving objects
 *
 * @param {DataSnapshot} dataSnapshot - Child snapshot
 * @param {SearchClient} client - Algolia client
 * @param {string} index - Algolia index name
 */
async function updateExistingOrAddNewFirebaseDatabaseObject(
  dataSnapshot: DataSnapshot,
  client: SearchClient,
  index: string,
): Promise<BatchResponse[]> {
  return client.saveObjects({
    indexName: index,
    objects: prepareObjectToExporting(
      dataSnapshot.key ?? "",
      dataSnapshot.val(),
    ),
  });
}

/**
 * Convenience wrapper over Algolia's SDK function for saving objects
 *
 * @param {DocumentSnapshot} dataSnapshot - Child snapshot
 * @param {SearchClient} client - Algolia client
 * @param {string} index - Algolia index name
 */
async function updateExistingOrAddNewFirestoreObject(
  dataSnapshot: DocumentSnapshot,
  client: SearchClient,
  index: string,
): Promise<BatchResponse[]> {
  return client.saveObjects({
    indexName: index,
    objects: prepareObjectToExporting(dataSnapshot.id, dataSnapshot.data()),
  });
}

/**
 * Convenience wrapper over Algolia's SDK function for deletion of the objects
 *
 * @param {string} id - Firebase Database key or Firestore id
 * @param {SearchClient} client - Algolia client
 * @param {string} index - Algolia index name
 */
const removeObject = async (id: string, client: SearchClient, index: string) =>
  client.deleteObject({
    indexName: index,
    objectID: id,
  });

/**
 * Determine whether it's deletion or update or insert action
 * and send changes to Algolia
 * Firebase Database Cloud Functions by default should return Promise object
 * So, for usability, we return Promise too
 * @param {SearchClient} client - Algolia client
 * @param {string} index - Algolia index name
 * @param {Change<DataSnapshot>} change - Firebase Realtime database change
 */
export async function syncAlgoliaWithFirebase(
  client: SearchClient,
  index: string,
  change: Change<DataSnapshot>,
): Promise<unknown> {
  if (!change.after.exists()) {
    return removeObject(change.before.key ?? "", client, index);
  }

  return updateExistingOrAddNewFirebaseDatabaseObject(
    change.after,
    client,
    index,
  );
}

/**
 * Determine whether it's deletion or update or insert action
 * and send changes to Algolia
 * @param {SearchClient} client - Algolia client
 * @param {string} index - Algolia index name
 * @param {Change<DocumentSnapshot>} change - Firestore change
 */
export async function syncAlgoliaWithFirestore(
  client: SearchClient,
  index: string,
  change: Change<DocumentSnapshot>,
): Promise<unknown> {
  if (!change.after.exists) {
    return removeObject(change.before.id, client, index);
  }

  return updateExistingOrAddNewFirestoreObject(change.after, client, index);
}
