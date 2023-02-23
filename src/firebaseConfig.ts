// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDq0tPMQUEykk1Q-bwI4T2IW28-IvM5qsk",
    authDomain: "agile-shift-c28f2.firebaseapp.com",
    projectId: "agile-shift-c28f2",
    storageBucket: "agile-shift-c28f2.appspot.com",
    messagingSenderId: "870889150710",
    appId: "1:870889150710:web:272d542dd633552b9db4d7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };