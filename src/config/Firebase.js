// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import {db} from "./config/firebase.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp-p2zaOjarc5L_RKWHnrlnn-EfbQgZrc",
  authDomain: "real-estate-react-d187b.firebaseapp.com",
  projectId: "real-estate-react-d187b",
  storageBucket: "real-estate-react-d187b.firebasestorage.app",
  messagingSenderId: "53121860764",
  appId: "1:53121860764:web:618635d8e62858c1d15959"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {auth, firestore};

