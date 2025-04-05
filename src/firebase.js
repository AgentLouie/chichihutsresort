
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgPoLAJ2gkkXvpfFeI_325bCmCS3iLbxg",
  authDomain: "chichi-huts-resort.firebaseapp.com",
  projectId: "chichi-huts-resort",
  storageBucket: "chichi-huts-resort.firebasestorage.app",
  messagingSenderId: "277991760010",
  appId: "1:277991760010:web:14aff5c6257b9030a94d73"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, addDoc, auth };