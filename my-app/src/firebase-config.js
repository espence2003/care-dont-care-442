// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY8SB8ANp00dP-BArDx4XVjXcqMO5CqwE",
  authDomain: "caredontcare442.firebaseapp.com",
  projectId: "caredontcare442",
  storageBucket: "caredontcare442.appspot.com",
  messagingSenderId: "1034634685549",
  appId: "1:1034634685549:web:9e562e8e06b30a9a6de364"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);