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

import type { SearchClient } from '@algolia/client-search'
import { DataSnapshot } from 'firebase-functions/v2/database'
import firebaseFunctionsTest from 'firebase-functions-test'
import { describe, expect, test } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { syncAlgoliaWithFirebase, syncAlgoliaWithFirestore } from '../index'

const { database, firestore } = firebaseFunctionsTest()

describe('Algolia Firebase Functions', () => {
  test('should add new objects from Realtime Database to index', () => {
    const fakeClient = mock<SearchClient>()
    const fakeChange = database.exampleDataSnapshotChange()

    syncAlgoliaWithFirebase(fakeClient, 'test', fakeChange)

    expect(fakeClient.saveObjects).toHaveBeenCalled()
  })

  test('should add new nested objects from Realtime Database to index', () => {
    const fakeClient = mock<SearchClient>()
    const fakeChange = database.exampleDataSnapshotChange()
    fakeChange.after = new DataSnapshot({
      testKey1: {
        testValue: 'test',
      },
      testKey2: {
        testValue: 'test',
      },
    })

    syncAlgoliaWithFirebase(fakeClient, 'test', fakeChange)

    expect(fakeClient.saveObjects).toHaveBeenCalled()
  })

  test('should delete Realtime Database object from index', () => {
    const fakeClient = mock<SearchClient>()
    const fakeChange = database.exampleDataSnapshotChange()
    fakeChange.after = new DataSnapshot(null)

    syncAlgoliaWithFirebase(fakeClient, 'test', fakeChange)

    expect(fakeClient.deleteObject).toHaveBeenCalled()
  })

  test('should add new objects from Firestore to index', () => {
    const fakeClient = mock<SearchClient>()
    const fakeChange = firestore.exampleDocumentSnapshotChange()

    syncAlgoliaWithFirestore(fakeClient, 'test', fakeChange)

    expect(fakeClient.saveObjects).toHaveBeenCalled()
  })

  test('should delete Firestore object from index', () => {
    const fakeClient = mock<SearchClient>()
    const fakeChange = firestore.exampleDocumentSnapshotChange()
    fakeChange.after = firestore.makeDocumentSnapshot({}, 'records/1234')

    syncAlgoliaWithFirestore(fakeClient, 'test', fakeChange)

    expect(fakeClient.deleteObject).toHaveBeenCalled()
  })
})
