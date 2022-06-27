import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const updateFullName = functions.firestore
  .document('user/{docId}')
  .onUpdate((snap, context) => {
    let newValue = snap.after.data();

    // to avoid trailing space when only one name is given
    newValue.fullName = [newValue.firstName, newValue.lastName].join(' ');
    let docId = snap.after.id;

    // update user doc
    return db
      .doc('user/' + docId)
      .update(newValue)
      .then((x) => {
        console.log(x);
      })
      .catch((err) => {
        console.log(err);
      });
  });
