const formValidation = () => {
    const email = document.registration.email.value;
    const country = document.registration.country.value;
    const username = document.registration.username.value;
    const displayName = document.registration.displayName.value;
    const pronouns = document.registration.pronouns.value;
    const password = document.registration.password.value;
    console.log("email: " + email);
    console.log("country: " + country);
    console.log("username: " + username);
    console.log("display name: " + displayName);
    console.log('pronouns: ' + pronouns);
    console.log('password: ' + password);

    document.getElementById("pronouns").addEventListener("change", function () {
        var customPronounsInput = document.getElementById("customPronouns");
        if (this.value === "custom") {
            customPronounsInput.style.display = "block";
        } else {
            customPronounsInput.style.display = "none";
        }
    });

    const verifs = () => {
        if (username.length < 2 || password.length < 5) {
            alert("Usernames cannot be shorter than 2 characters.")
        }
    }
    verifs()
}

document.registration.addEventListener("submit", function (event) {
    event.preventDefault();
    formValidation();
})