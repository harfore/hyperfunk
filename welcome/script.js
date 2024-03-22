const fetchEventsTicketmaster = async (dmaId) => {
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
        if (dmaId === 326) {
            townToPresent = presentLosAngeles;
        };

        const events = data._embedded?.events || [];
        // const eventName = data._embedded?.events[0].name || [];
        // const eventDate = data._embedded?.events[0].dates?.start?.localDate || [];
        //const eventPictureOne = data._embedded?.events[0].images[0].url || [];
        const artistPictureOne = data._embedded.events[0]._embedded.attractions[0].images[0].url || [];

        let upcomingEventsCityHtml = '';
        upcomingEventsCityHtml += `<div class="event_container">`
        // upcomingEventsCityHtml += `<h2>${_embedded.events[0]._embedded.venues[0].city.name},${_embedded.events[0]._embedded.venues[0].state.name},${_embedded.events[0]._embedded.venues[0].country.countryCode}</h2>`
        events.slice(0, 15).forEach(event => {
            window.eventName = event.name;
            const eventDate = event.dates?.start?.localDate;
            const eventImage = event.images[0].url;
            upcomingEventsCityHtml += `<div class="event_item">`;
            upcomingEventsCityHtml += `<a href="/show/show.html">`;
            upcomingEventsCityHtml += `<div class="eventPresentation">`;
            upcomingEventsCityHtml += `<h2>${eventName}</h2>`;
            upcomingEventsCityHtml += `<img class="event_image" src="${eventImage}"/>`;
            upcomingEventsCityHtml += `<h4>${eventDate}</h4>`;
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `<div class="event_attractions">`;
            const attractions = event._embedded?.attractions || [];
            attractions.forEach(attraction => {
                upcomingEventsCityHtml += `<div class="event_attraction">`;
                const artist = attraction.name;
                const artistPictureOne = attraction.images?.[0].url;
                upcomingEventsCityHtml += `<h2>${artist}</h2>`;
                let musicGenre = event._embedded.attractions[0].classifications[0].genre.name || '';
                if (musicGenre === 'Undefined') {
                    musicGenre = ' ';
                };
                upcomingEventsCityHtml += `<img class="artist_image" src="${artistPictureOne}"><br>`;
                upcomingEventsCityHtml += `<p class='musicGenre'>${musicGenre}<br>`;
                upcomingEventsCityHtml += `</a>`;
                upcomingEventsCityHtml += `</div>`;
            });
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `</div>`;
            console.log("eventNameInsideFetch: " + eventName)
        });
        upcomingEventsCityHtml += `</div>`;
        upcomingEventsCityHtml += `</div>`;
        townToPresent.innerHTML = upcomingEventsCityHtml;
        // showPresentation.innerHTML = artistChoiceHtml;

        document.querySelectorAll('.event_item').forEach(item => {
            item.addEventListener('click', function () {
                const clickedArtist = this.querySelector('h2').textContent;
                console.log("Clicked on event item. Artist: " + clickedArtist);
                module.exports = clickedArtist;
            });
        });

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

fetchEventsTicketmaster(326);
console.log("eventNameOutsideFetch: " + window.eventName);

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
// - scrapping