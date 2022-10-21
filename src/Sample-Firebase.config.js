// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore } from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "housemarket-place.firebaseapp.com",
  projectId: "housemarket-place",
  storageBucket: "housemarket-place.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFireStore();
