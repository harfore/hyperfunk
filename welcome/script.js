// export { exportSelectedEvent }


const fetchEvents = async (dmaId) => {
    const activateLosAngeles = document.getElementById('activateLosAngeles');
    const activateRioDeJaneiro = document.getElementById('activateRioDeJaneiro');
    const activateParisFrance = document.getElementById('activateParisFrance');
    const activateSingapore = document.getElementById('activateSingapore');
    const activateTokyoJapan = document.getElementById('activateTokyoJapan');
    const activateAmsterdam = document.getElementById('activateAmsterdam');
    const presentLosAngeles = document.getElementById('presentLosAngeles');
    const presentRioDeJaneiro = document.getElementById('presentRioDeJaneiro');
    const presentParisFrance = document.getElementById('presentParisFrance');
    const presentSingapore = document.getElementById('presentSingapore');
    const presentTokyoJapan = document.getElementById('presentTokyoJapan');
    const presentAmsterdam = document.getElementById('presentAmsterdam');
    const showPresentation = document.getElementById('artistChoice');

    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`);

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await res.json();

        let townToPresent = '';
        if (dmaId === 324) {
            townToPresent = presentLosAngeles;
        };

        const events = data._embedded?.events || [];

        // Construct HTML content for events and attractions
        let upcomingEventsCityHtml = '';
        upcomingEventsCityHtml += `<div class="event_container">`
        // upcomingEventsCityHtml += `<h2>${_embedded.events[0]._embedded.venues[0].city.name},${_embedded.events[0]._embedded.venues[0].state.name},${_embedded.events[0]._embedded.venues[0].country.countryCode}</h2>`
        events.slice(0, 10).forEach(event => {
            const attractions = event._embedded?.attractions || [];
            attractions.forEach(attraction => {
                const artist = attraction.name;
                const artistPictureOne = attraction.images?.[0].url || '';
                let musicGenre = attraction.classifications[0].genre.name || '';
                if (musicGenre === 'Undefined') {
                    musicGenre = ' ';
                };
                upcomingEventsCityHtml += `<div id="event_item" class="event_item">`;
                upcomingEventsCityHtml += `<a href="/show/show.html">`;
                upcomingEventsCityHtml += `<h2>${artist}</h2>`;
                // upcomingEventsCityHtml += `<p>Date: ${dates.start.localDate}</p>`;
                upcomingEventsCityHtml += `<img class="event_image" src="${artistPictureOne}"><br>`;
                upcomingEventsCityHtml += `<p class='musicGenre'>${musicGenre}`;
                upcomingEventsCityHtml += `</a>`;
                upcomingEventsCityHtml += `</div>`;
            })
        });
        upcomingEventsCityHtml += `</div>`;
        townToPresent.innerHTML = upcomingEventsCityHtml;
        // showPresentation.innerHTML = artistChoiceHtml;
        const displayEventsOnResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                townToPresent.innerHTML = upcomingEventsCityHtml;
            }
        };

        window.addEventListener('resize', displayEventsOnResize);


    } catch (err) {
        console.error(err);
        presentLosAngeles.innerHTML = `<p>${err}</p>`;
    };
};

fetchEvents(324);

// let exportSelectedEvent = '';
// addEventListener.event_item('click', function exportArtist() {
//     exportSelectedEvent = artist;
// });
// console.log("artist to export: " + artist);

// boutons villes
// a - text decoration: none
// villes console.log cities.js
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
// - page show
// - villes
// - refacto
// - mettre en ligne