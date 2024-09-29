import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3HCvur1F2wNv7WPJ8Ckg2rvBjPMW9xJc",
    authDomain: "hyperfunk-d8a80.firebaseapp.com",
    projectId: "hyperfunk-d8a80",
    storageBucket: "hyperfunk-d8a80.appspot.com",
    messagingSenderId: "870303507313",
    appId: "1:870303507313:web:547e178717ec3bc56a4cd0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };