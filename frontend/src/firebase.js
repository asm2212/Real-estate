// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e931a.firebaseapp.com",
  projectId: "mern-estate-e931a",
  storageBucket: "mern-estate-e931a.appspot.com",
  messagingSenderId: "129336820893",
  appId: "1:129336820893:web:98de7b7209cca7d2da0074"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);