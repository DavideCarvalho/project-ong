import * as firebase from 'firebase/app';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = publicRuntimeConfig.firebaseConfig;

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
