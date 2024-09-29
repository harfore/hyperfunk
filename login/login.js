import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3HCvur1F2wNv7WPJ8Ckg2rvBjPMW9xJc",
    authDomain: "hyperfunk-d8a80.firebaseapp.com",
    projectId: "hyperfunk-d8a80",
    storageBucket: "hyperfunk-d8a80.appspot.com",
    messagingSenderId: "870303507313",
    appId: "1:870303507313:web:547e178717ec3bc56a4cd0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("login").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const password = this.password.value;
    const loginError = document.getElementById('loginError');

    loginError.innerText = '';

    if (!email || !password) {
        loginError.innerText = 'Please fill in both fields.';
        return; // Stop further execution if validation fails
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User logged in:', user);
    } catch (error) {
        const errorMessage = error.message;
        document.getElementById('loginError').innerText = errorMessage;
    }
});