
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
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

const checkUserRole = async (uid) => {
  try {
    // Reference the 'admins' collection, and get the document for the given uid
    const userDocRef = doc(db, 'admins', uid);

    // Fetch the document
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      return data.role; // 'admin' or 'staff'
    } else {
      console.log('No user document found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};

export { db, collection, addDoc, auth, checkUserRole };