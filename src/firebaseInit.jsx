// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmuYV-hEkrrlS1FV708gShV_XyXj2KfYs",
  authDomain: "ecommerce-4e892.firebaseapp.com",
  projectId: "ecommerce-4e892",
  storageBucket: "ecommerce-4e892.appspot.com",
  messagingSenderId: "132128859733",
  appId: "1:132128859733:web:7dc248a1a0c845664596dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);