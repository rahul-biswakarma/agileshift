// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAKDHbkTh6EPvoQadQhQTSYaOkHGPN4Zj8",
    authDomain: "crm-data-base.firebaseapp.com",
    projectId: "crm-data-base",
    storageBucket: "crm-data-base.appspot.com",
    messagingSenderId: "1089918448061",
    appId: "1:1089918448061:web:dedbf04725d98beff562d4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };