const formValidation = () => {
    const form = document.getElementById("registration");

    const verifs = (email, username, handle, password) => {
        const validateEmail = (email) => {
            const emailError = document.getElementById('fillErrorEmail')
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // testing
                return true
            } else {
                emailError.innerHTML = `<p>Please type a valid email.</p>`
            }
        }
        validateEmail(email)
        const validateUsername = (username) = {

        }
        const usernameError = document.getElementById("fillErrorUsername");
        const passwordError = document.getElementById("fillErrorPassword");
        const handleError = document.getElementById("fillErrorHandle");
        if (username.length < 3) {
            usernameError.innerHTML = "<p>Usernames cannot be less than 3 characters long.</p>"
        }
        if (handle.length < 3) {
            handleError.innerHTML = "<p>Handles cannot be less than 3 characters long.</p>"
        }
        if (password.length < 5) {
            passwordError.innerHTML = "<p>Passwords cannot be less than 2 characters long.</p>"
        }
    }

    const email = form.email.value;
    const country = form.country.value;
    const username = form.username.value;
    const handle = form.handle.value; // a handle is the same thing as a display name
    const pronouns = form.pronouns.value;
    const password = form.password.value;
    console.log("email: " + email);
    console.log("country: " + country);
    console.log("username: " + username);
    console.log("display name: " + handle);
    console.log('pronouns: ' + pronouns);
    console.log('password: ' + password);

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

    return verifs(email, username, handle, password)
}

document.registration.addEventListener("submit", function (event) {
    event.preventDefault();
    formValidation();
});