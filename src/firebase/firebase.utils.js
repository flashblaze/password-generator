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

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (e) {
      console.log(`Error creating user ${e.message}`);
    }
  }

  return userRef;
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
