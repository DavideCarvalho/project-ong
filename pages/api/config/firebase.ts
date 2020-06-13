import * as admin from 'firebase-admin';

const gCloudCredentialsBuffer = new Buffer(process.env.GCLOUD_CREDENTIALS, 'base64');
const firebaseDatabaseUrlBuffer = new Buffer(process.env.FIREBASE_DATABASE_URL, 'base64');
const firebaseStorageBucketUrlBuffer = new Buffer(process.env.FIREBASE_STORAGE_BUCKET_URL, 'base64');

!admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(gCloudCredentialsBuffer.toString("utf8"))),
  databaseURL: firebaseDatabaseUrlBuffer.toString(("utf8")),
  storageBucket: firebaseStorageBucketUrlBuffer.toString("utf8"),
}) : admin.app();

export const firestore = admin.firestore();
export const storage = admin.storage().bucket();
