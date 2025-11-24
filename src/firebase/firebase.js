import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBy58jROAUE7bA671_4OHMooaczuntN9sA",
  authDomain: "sajha-login-3b595.firebaseapp.com",
  projectId: "sajha-login-3b595",
  storageBucket: "sajha-login-3b595.firebasestorage.app",
  messagingSenderId: "845636145104",
  appId: "1:845636145104:web:b7df3afc03844e3a7033d5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
