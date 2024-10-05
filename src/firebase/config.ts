import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzAm0TUmSUI2_kZKqgeCeWhXm6lLNMzcA",
  authDomain: "ifitnessreact.firebaseapp.com",
  projectId: "ifitnessreact",
  storageBucket: "ifitnessreact.appspot.com",
  messagingSenderId: "962332987079",
  appId: "1:962332987079:web:ab334168b565334638b8e2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Test Firebase connection
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Firebase connection successful. User is signed in:', user);
  } else {
    console.log('Firebase connection successful. No user is signed in.');
  }
});

console.log('Firebase initialization completed');