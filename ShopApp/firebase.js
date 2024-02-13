// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDbhGCWY0Y2bpO0H5NTAnSQeIIf70OJoGY",

  authDomain: "shop-3418f.firebaseapp.com",

  projectId: "shop-3418f",

  storageBucket: "shop-3418f.appspot.com",

  messagingSenderId: "1061747853534",

  appId: "1:1061747853534:web:440d44b42b641f6f809a4f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export default db
