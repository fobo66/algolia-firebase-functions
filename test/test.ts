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
import { database } from 'firebase-functions/v1';
import * as sinon from 'ts-sinon';
import * as sinonChai from 'sinon-chai';
import { expect, use } from 'chai';

import * as functionsTest from 'firebase-functions-test';
import * as algoliaFirebaseFunctions from '../index';

const functions = functionsTest();

use(sinonChai);

describe('Algolia Firebase Functions', () => {
  let fakeIndex: sinon.StubbedInstance<SearchIndex>;

  beforeEach(() => {
    fakeIndex = sinon.stubInterface<SearchIndex>();
  });

  it('should add new objects from Realtime Database to index', () => {
    const fakeChange = functions.database.exampleDataSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    expect(fakeIndex.saveObjects).to.have.been.called;
  });

  it('should add new nested objects from Realtime Database to index', () => {
    const fakeChange = functions.database.exampleDataSnapshotChange();
    fakeChange.after = new database.DataSnapshot({
      testKey1: {
        testValue: 'test',
      },
      testKey2: {
        testValue: 'test',
      },
    });

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    expect(fakeIndex.saveObjects).to.have.been.called;
  });

  it('should delete Realtime Database object from index', () => {
    const fakeChange = functions.database.exampleDataSnapshotChange();
    fakeChange.after = new database.DataSnapshot(null);

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    expect(fakeIndex.deleteObject).to.have.been.called;
  });

  it('should add new objects from Firestore to index', () => {
    const fakeChange = functions.firestore.exampleDocumentSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    expect(fakeIndex.saveObjects).to.have.been.called;
  });

  it('should delete Firestore object from index', () => {
    const fakeChange = functions.firestore.exampleDocumentSnapshotChange();
    fakeChange.after = functions.firestore.makeDocumentSnapshot({}, 'records/1234');

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    expect(fakeIndex.deleteObject).to.have.been.called;
  });
});
