// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlWMITmwSLhyMCgp8kVJ3kMzce61X3X_w",
  authDomain: "espece-first.firebaseapp.com",
  projectId: "espece-first",
  storageBucket: "espece-first.appspot.com",
  messagingSenderId: "106663450794",
  appId: "1:106663450794:web:3013b9560a00104685d8d3",
  measurementId: "G-Z272DS6441",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export { db, googleProvider, auth, app };
