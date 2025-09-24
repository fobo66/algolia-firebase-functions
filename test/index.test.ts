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

import { expect, test, describe } from "@jest/globals";

import * as algoliaFirebaseFunctions from "../index";
import { DataSnapshot } from "firebase-functions/v2/database";
import firebaseFunctionsTest from "firebase-functions-test";
import { FakeSearchClient } from "./FakeSearchClient";

const { database, firestore } = firebaseFunctionsTest();

describe("Algolia Firebase Functions", () => {
  test("should add new objects from Realtime Database to index", () => {
    const fakeClient = new FakeSearchClient();
    const fakeChange = database.exampleDataSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(
      fakeClient,
      "test",
      fakeChange,
    );

    expect(fakeClient.saveObjectsCalled).toBe(true);
  });

  test("should add new nested objects from Realtime Database to index", () => {
    const fakeClient = new FakeSearchClient();
    const fakeChange = database.exampleDataSnapshotChange();
    fakeChange.after = new DataSnapshot({
      testKey1: {
        testValue: "test",
      },
      testKey2: {
        testValue: "test",
      },
    });

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(
      fakeClient,
      "test",
      fakeChange,
    );

    expect(fakeClient.saveObjectsCalled).toBe(true);
  });

  test("should delete Realtime Database object from index", () => {
    const fakeClient = new FakeSearchClient();
    const fakeChange = database.exampleDataSnapshotChange();
    fakeChange.after = new DataSnapshot(null);

    algoliaFirebaseFunctions.syncAlgoliaWithFirebase(
      fakeClient,
      "test",
      fakeChange,
    );

    expect(fakeClient.deleteObjectCalled).toBe(true);
  });

  test("should add new objects from Firestore to index", () => {
    const fakeClient = new FakeSearchClient();
    const fakeChange = firestore.exampleDocumentSnapshotChange();

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(
      fakeClient,
      "test",
      fakeChange,
    );

    expect(fakeClient.saveObjectsCalled).toBe(true);
  });

  test("should delete Firestore object from index", () => {
    const fakeClient = new FakeSearchClient();
    const fakeChange = firestore.exampleDocumentSnapshotChange();
    fakeChange.after = firestore.makeDocumentSnapshot({}, "records/1234");

    algoliaFirebaseFunctions.syncAlgoliaWithFirestore(
      fakeClient,
      "test",
      fakeChange,
    );

    expect(fakeClient.deleteObjectCalled).toBe(true);
  });
});
