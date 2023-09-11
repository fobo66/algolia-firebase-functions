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

import { SearchIndex } from 'algoliasearch';
import { expect, test, describe, spyOn } from "bun:test";
import * as sinon from 'ts-sinon';

import * as algoliaFirebaseFunctions from '../index';
import { DataSnapshot } from 'firebase-functions/v2/database';
import firebaseFunctionsTest from "firebase-functions-test";

const { database, firestore } = firebaseFunctionsTest();

describe('Algolia Firebase Functions', () => {

  test('should add new objects from Realtime Database to index', () => {
    const fakeIndex: sinon.StubbedInstance<SearchIndex> = sinon.stubInterface<SearchIndex>()
    const fakeChange = database.exampleDataSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    expect(fakeIndex.saveObjects.called).toBe(true);
  });

  test('should add new nested objects from Realtime Database to index', () => {
    const fakeIndex: sinon.StubbedInstance<SearchIndex> = sinon.stubInterface<SearchIndex>()
    const fakeChange = database.exampleDataSnapshotChange();
    fakeChange.after = new DataSnapshot({
      testKey1: {
        testValue: 'test',
      },
      testKey2: {
        testValue: 'test',
      },
    });

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    expect(fakeIndex.saveObjects.called).toBe(true);
  });

  test('should delete Realtime Database object from index', () => {
    const fakeIndex: sinon.StubbedInstance<SearchIndex> = sinon.stubInterface<SearchIndex>()
    const fakeChange = database.exampleDataSnapshotChange();
    fakeChange.after = new DataSnapshot(null);

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    expect(fakeIndex.deleteObject.called).toBe(true);
  });

  test('should add new objects from Firestore to index', () => {
    const fakeIndex: sinon.StubbedInstance<SearchIndex> = sinon.stubInterface<SearchIndex>()
    const fakeChange = firestore.exampleDocumentSnapshotChange();
    const saveObjects = spyOn(fakeIndex.saveObjects, "saveObjects");

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    expect(fakeIndex.saveObjects.called).toBe(true);
  });

  test('should delete Firestore object from index', () => {
    const fakeIndex: sinon.StubbedInstance<SearchIndex> = sinon.stubInterface<SearchIndex>()
    const fakeChange = firestore.exampleDocumentSnapshotChange();
    fakeChange.after = firestore.makeDocumentSnapshot({}, 'records/1234');

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    expect(fakeIndex.deleteObject.called).toBe(true);
  });
});
