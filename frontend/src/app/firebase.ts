import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhlcIOSP87k5kpdPgyKcegZKsinJ8OqPQ",
  authDomain: "vtt-project-91d67.firebaseapp.com",
  projectId: "vtt-project-91d67",
  storageBucket: "vtt-project-91d67.appspot.com",
  messagingSenderId: "69740005014",
  appId: "1:69740005014:web:c84ca1c1ff6fa9fdb3e4b7",
  measurementId: "G-ZE0026YQRH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
