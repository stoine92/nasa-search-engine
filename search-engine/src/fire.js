import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDg9Flw1rPUwb-n2bcL9SFs0P6CokpKVHs",
  authDomain: "nasasearchengine.firebaseapp.com",
  projectId: "nasasearchengine",
  storageBucket: "nasasearchengine.appspot.com",
  messagingSenderId: "537580452433",
  appId: "1:537580452433:web:70ec736af1f843502bd670",
  measurementId: "G-YMKQXPXRYY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };