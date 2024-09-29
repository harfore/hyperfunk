import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore();

// Get current user and fetch their Firestore data
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;

        // Fetch user's profile from Firestore
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            // Update profile page with user data
            document.getElementById('user_username').innerText = userData.username;
            document.getElementById('user_email').innerText = user.email;
            document.getElementById('user_handle').innerText = userData.handle;
            document.getElementById('user_country').innerText = userData.country;
            document.getElementById('user_pronouns').innerText = userData.pronouns;
            console.log(userData.username);

            // Add other fields as necessary
        } else {
            console.log("No user data found!");
        }
    } else {
        // No user is signed in, redirect to login
        window.location.href = "../login/login.html";
    }
});
