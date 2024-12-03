const admin = require('firebase-admin');
const { FIREBASE_CREDENTIALS } = require('./config');

const serviceAccount = require(FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase-adminsdk-wykgj@nityo-exam-f2d1d.iam.gserviceaccount.com',
});

const db = admin.firestore();
module.exports = db;
