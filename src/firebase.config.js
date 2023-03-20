// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIFDEYeq_ZTwkAdPg9CiBefKFNYS8o8rY",
  authDomain: "sports-app-e5297.firebaseapp.com",
  projectId: "sports-app-e5297",
  storageBucket: "sports-app-e5297.appspot.com",
  messagingSenderId: "286067935847",
  appId: "1:286067935847:web:772f9b8c2addc4311662c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()