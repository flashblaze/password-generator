import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCsvnBLXMLvpe04z8mWnurotZ7_W2KXeeM',
  authDomain: 'password-generator-3cd5e.firebaseapp.com',
  databaseURL: 'https://password-generator-3cd5e.firebaseio.com',
  projectId: 'password-generator-3cd5e',
  storageBucket: 'password-generator-3cd5e.appspot.com',
  messagingSenderId: '228486148472',
  appId: '1:228486148472:web:493e8e45ba2ba87559188d',
  measurementId: 'G-Y6FPZN6KQZ'
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
