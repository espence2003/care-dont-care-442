import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCY8SB8ANp00dP-BArDx4XVjXcqMO5CqwE",
  authDomain: "caredontcare442.firebaseapp.com",
  projectId: "caredontcare442",
  storageBucket: "caredontcare442.appspot.com",
  messagingSenderId: "1034634685549",
  appId: "1:1034634685549:web:9e562e8e06b30a9a6de364"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
