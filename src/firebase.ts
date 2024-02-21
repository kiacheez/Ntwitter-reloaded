// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0wnB-Mxoln_VQUW7rc31jGVU8KFDfCrc",
  authDomain: "ntwitter-reloade.firebaseapp.com",
  projectId: "ntwitter-reloade",
  storageBucket: "ntwitter-reloade.appspot.com",
  messagingSenderId: "516310221979",
  appId: "1:516310221979:web:ba9e20767b410c62c1323e",
  measurementId: "G-2P3SDNWZSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const db = getFirestore(app);