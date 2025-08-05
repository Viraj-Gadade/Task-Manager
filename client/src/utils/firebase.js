// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-15e45.firebaseapp.com",
  projectId: "task-manager-15e45",
  storageBucket: "task-manager-15e45.firebasestorage.app",
  messagingSenderId: "401283470087",
  appId: "1:401283470087:web:6c1ef5c2f64bacb5802ba2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}