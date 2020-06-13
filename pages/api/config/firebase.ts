import * as admin from 'firebase-admin';

const buffer = new Buffer(process.env.GCLOUD_CREDENTIALS, 'base64');

admin.initializeApp({
  credential: admin.credential.cert(buffer.toString("utf-8")),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
