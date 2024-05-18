const determineCity = () => {
    // Check if the user is not on the upcomingEvents page
    if (!window.location.pathname.includes("upcomingEvents")) {
        const activateLosAngeles = document.getElementById('activateLosAngeles');
        const activateNewYork = document.getElementById('activateNewYork');
        const activateToronto = document.getElementById('activateToronto');
        const activateNewOrleans = document.getElementById('activateNewOrleans');
        const activateHouston = document.getElementById('activateHouston');
        const activateLondon = document.getElementById('activateLondon');

        let dmaId = 326;

        activateLosAngeles.addEventListener('click', () => {
            dmaId = 324;
            sessionStorage.setItem("dmaId", dmaId);
        });
        activateNewYork.addEventListener('click', () => {
            dmaId = 345;
            sessionStorage.setItem("dmaId", dmaId);
        });

        activateToronto.addEventListener('click', () => {
            dmaId = 327;
            sessionStorage.setItem("dmaId", dmaId);
        });
        activateNewOrleans.addEventListener('click', () => {
            dmaId = 344;
            sessionStorage.setItem("dmaId", dmaId);
        });
        activateHouston.addEventListener('click', () => {
            dmaId = 300;
            sessionStorage.setItem("dmaId", dmaId);
        });
        activateLondon.addEventListener('click', () => {
            dmaId = 602;
            sessionStorage.setItem("dmaId", dmaId);
        });
    };
};

window.onload = (event) => {
    console.log('Page has loaded.')
    determineCity();
};

// REPLACE CSS ON MAIN
// villes console.log cities.js
// hide overflow
// carousel tournées les plus populaires au dessus des villes
// hide custom pronouns input
// décalage
/* if (attraction.externalLinks) {
    htmlContent += `<div class="social-container"><p><a href="${attraction.externalLinks.spotify || '#'}">
    <img src="/socials/spotify.png" alt="spotify link" class='social-media' width="60" height="auto">
    </a></p>`;
    htmlContent += `<p><a href="${attraction.externalLinks.youtube || '#'}">
    <img src="/socials/youtube.png" alt="youtube link" class='social-media' width="60" height="auto">
    </a></p>`;
    htmlContent += `<p><a href="${attraction.externalLinks.instagram || '#'}">
    <img src="/socials/instagram.png" alt="spotify link" class='social-media' width="60" height="auto">
    </a></p></div>`;
} */
// htmlContent += `<p class='bookingLink' >Booking link: <u>${attraction.url}</u></p>`;
// htmlContent += `<p><a href="${attraction.externalLinks.homepage || '#'}">Artist Homepage</a></p>`;
// pricesRange;
// - villes
// - refacto
// - scrapping