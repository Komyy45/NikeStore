import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAs_mF0jUCAwr6N_hoImyUJ6df7Q4PGxQk",
  authDomain: "nike-store-ff8bc.firebaseapp.com",
  projectId: "nike-store-ff8bc",
  storageBucket: "nike-store-ff8bc.appspot.com",
  messagingSenderId: "997151352283",
  appId: "1:997151352283:web:2a420984d60397cb8b33fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db  = getFirestore(app);