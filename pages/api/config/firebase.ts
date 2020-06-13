import * as admin from 'firebase-admin';

const gCloudCredentialsBuffer = new Buffer(process.env.GCLOUD_CREDENTIALS, 'base64');

!admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(gCloudCredentialsBuffer.toString("utf8"))),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_NAME,
}) : admin.app();

export const firestore = admin.firestore();
export const storage = admin.storage().bucket();
