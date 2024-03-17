// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe8aXcDEW0lxpkOxpZhaDhJ2H3jpLJBVg",
  authDomain: "dolly-fac53.firebaseapp.com",
  projectId: "dolly-fac53",
  storageBucket: "dolly-fac53.appspot.com",
  messagingSenderId: "572818950044",
  appId: "1:572818950044:web:9d319edcf66f810fc16a59",
  measurementId: "G-CLP13D8QZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth  = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const Provider = new GoogleAuthProvider();


export {Auth, db, storage, Provider};
