import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3HCvur1F2wNv7WPJ8Ckg2rvBjPMW9xJc",
    authDomain: "hyperfunk-d8a80.firebaseapp.com",
    projectId: "hyperfunk-d8a80",
    storageBucket: "hyperfunk-d8a80.appspot.com",
    messagingSenderId: "870303507313",
    appId: "1:870303507313:web:547e178717ec3bc56a4cd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use the imported getAuth function
const db = getFirestore(app);

const formValidation = () => {
    const form = document.getElementById("registration");
    const usernameError = document.getElementById("fillErrorUsername");
    const passwordError = document.getElementById("fillErrorPassword");
    const handleError = document.getElementById("fillErrorHandle");
    const emailError = document.getElementById('fillErrorEmail');

    usernameError.innerHTML = '';
    passwordError.innerHTML = '';
    handleError.innerHTML = '';
    emailError.innerHTML = '';

    const email = form.email.value;
    const username = form.username.value;
    const handle = form.handle.value; // handles = display names
    const password = form.password.value;

    const validateEmail = (email) => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // testing to see if the email format is valid
            return true
        } else {
            emailError.innerHTML = `<p>Please type a valid email.</p>`;
            return false
        }
    };
    validateEmail(email);

    const validateUsername = (username, us_min, us_max) => {
        const us_len = username.length
        if (us_len === 0 || us_len < us_min || us_len > us_max) {
            usernameError.innerHTML = `Usernames must be between ${us_min} and ${us_max} characters long`;
            return false;
        };
        return true;
    };
    validateUsername(username, 3, 22);

    const validateHandle = (handle, ha_min, ha_max) => {
        const ha_len = handle.length
        if (ha_len === 0 || ha_len < ha_min || ha_len > ha_max) {
            handleError.innerHTML = `Handles must be between ${ha_min}  and ${ha_max} characters long`;
            return false;
        };
        return true;
    }
    validateHandle(handle, 1, 35);

    const validatePassword = (password, ps_min, ps_max) => {
        const ps_len = password.length
        if (ps_len === 0 || ps_len < ps_min || ps_len > ps_max) {
            passwordError.innerHTML = `Passwords must be between ${ps_min} and ${ps_max} characters long.`;
            return false;
        };
        return true;
    };
    validatePassword(password, 5, 20);

    return validateEmail(email) &&
        validateUsername(username, 3, 22) &&
        validateHandle(handle, 1, 35) &&
        validatePassword(password, 5, 20);
}

// document.getElementById("pathToCustomPronouns").addEventListener("click", function () {
//     const customPronounsInput = document.getElementById("customPronouns");
//     if (customPronounsInput.style.display === "none" || customPronounsInput.style.display === "") {
//         customPronounsInput.style.display = 'block';
//         console.log('displaying the input');
//         console.log('custom pronoun: ' + pronouns.value);
//     } else {
//         customPronounsInput.style.display = "none";
//         console.log('hiding the input');
//     }
// });

document.getElementById("registration").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = this.email.value;
    const password = this.password.value;

    if (formValidation()) { // Only proceed if validation passes
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Additional user info
            const country = this.country.value;
            const username = this.username.value;
            const handle = this.handle.value;
            const pronouns = this.pronouns.value;

            // Save additional user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                country,
                username,
                handle,
                pronouns
            });
            console.log('User info saved successfully!');
            // Redirect or show success message
        } catch (error) {
            const errorMessage = error.message;
            document.getElementById('fillErrorEmail').innerText = errorMessage; // Show error
        }
    }
});