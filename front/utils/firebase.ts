import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = process.env.firebaseConfig;

let firestore: firebase.firestore.Firestore;
let auth: firebase.auth.Auth;
let analytics: firebase.analytics.Analytics;

export const firebaseInstance = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  analytics = firebase.analytics();
  firestore = firebase.firestore();
  auth = firebase.auth();
  return { firestore, auth, analytics };
};
