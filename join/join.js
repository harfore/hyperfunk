const formValidation = () => {
    const form = document.getElementById("registration");
    const usernameError = document.getElementById("fillErrorUsername");
    const passwordError = document.getElementById("fillErrorPassword");
    const handleError = document.getElementById("fillErrorHandle");

    const verifs = (email, username, handle, password) => {
        const validateEmail = (email) => {
            const emailError = document.getElementById('fillErrorEmail')
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // testing to see if the email format is valid
                return true
            } else {
                emailError.innerHTML = `<p>Please type a valid email.</p>`;
            }
        }
        validateEmail(email)
        const validateUsername = (username, us_min, us_max) => {
            const us_len = username.length
            if (us_len === 0 || us_len < us_min || us_len > us_max) {
                usernameError.innerHTML = `Usernames must be between 3 and 22 characters long`;
            }
        }
        validateUsername(username, 3, 22)
        const validateHandle = (handle, ha_min, ha_max) => {
            const ha_len = handle.length
            if (ha_len === 0 || ha_len < ha_min || ha_len > ha_max) {
                handleError.innerHTML = `Handles must be between 1 and 35 characters long`;
            }
        }
        validateHandle(handle, 1, 35)
        const validatePassword = (password, ps_min, ps_max) => {
            const ps_len = password.length
            if (ps_len === 0 || ps_len < ps_min || ps_len > ps_max) {
                passwordError.innerHTML = `Passwords must be between 5 and 20 characters long`;
            }
        }
        validatePassword(password, 5, 20)

    }

    const email = form.email.value;
    const country = form.country.value;
    const username = form.username.value;
    const handle = form.handle.value; // handles = display names
    const pronouns = form.pronouns.value;
    const password = form.password.value;

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

document.registration.addEventListener("submit", function () {
    formValidation();
});
// 10:15