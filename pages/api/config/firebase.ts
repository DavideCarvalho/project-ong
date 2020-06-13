import * as admin from 'firebase-admin';

const gCloudCredentialsBuffer = new Buffer(process.env.GCLOUD_CREDENTIALS, 'base64');
const firebaseDatabaseUrlBuffer = new Buffer(process.env.FIREBASE_DATABASE_URL, 'base64');

console.log(process.env);

admin.initializeApp({
  credential: admin.credential.cert(gCloudCredentialsBuffer.toString("utf8")),
  databaseURL: firebaseDatabaseUrlBuffer.toString(("utf8")),
});

export const firestore = admin.firestore();
export const storage = admin.storage();
