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

const assert = require('assert');
const sinon = require('sinon');
const functions = require('firebase-functions-test')();

const algoliaFirebaseFunctions = require('../dist/index');

describe('Algolia Firebase Functions', () => {
  let fakeIndex;

  before(() => {
    fakeIndex = {
      saveObjects: sinon.stub(),
      deleteObject: sinon.stub(),
    };
  });

  it('should add new objects from Realtime Database to index', () => {
    const fakeChange = functions.database.exampleDataSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    assert(fakeIndex.saveObjects.called);
  });

  it('should delete Realtime Database object from index', () => {
    const fakeChange = {
      before: functions.database.exampleDataSnapshot(),
      after: {
        exists: () => false,
      },
    };

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(fakeIndex, fakeChange);

    assert(fakeIndex.deleteObject.called);
  });

  it('should add new objects from Firestore to index', () => {
    const fakeChange = functions.firestore.exampleDocumentSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    assert(fakeIndex.saveObjects.called);
  });

  it('should delete Firestore object from index', () => {
    const fakeChange = {
      before: functions.firestore.exampleDocumentSnapshot(),
      after: {
        exists: false,
      },
    };

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(fakeIndex, fakeChange);

    assert(fakeIndex.deleteObject.called);
  });
});
