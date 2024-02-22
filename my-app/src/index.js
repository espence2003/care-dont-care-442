import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// To deploy:
// firebase login
// firebase init
// firebase deploy

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
