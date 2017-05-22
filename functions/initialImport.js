const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp(functions.config().firebase);
const algolia = algoliasearch(functions.config().algolia.app,
                              functions.config().algolia.key);
exports.initialImport = functions.https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
  }

  cors(req, res,  () => {
      const refToImport = admin.database().ref(req.body.ref);
      const index = algolia.initIndex(req.body.index);
      refToImport.once('value', (snapshot) => {
        let objectsToIndex = [];
        snapshot.forEach(child => {
          let childKey = child.key;
          let childData = child.val();
          childData.objectID = childKey;
          objectsToIndex.push(childData);
        });
      });
  });
});