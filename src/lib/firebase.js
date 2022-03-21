// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZLH2YrQIMJvr_ysRH-TFPFI9rWH6lDZk",
  authDomain: "cryptic-x.firebaseapp.com",
  projectId: "cryptic-x",
  storageBucket: "cryptic-x.appspot.com",
  messagingSenderId: "131667236692",
  appId: "1:131667236692:web:cff8f0d293a83681791ac1",
};

// Initialize Firebase
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
