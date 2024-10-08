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

    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const showUrlToFetch = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`;
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

        const eventsCity = data._embedded.events[0]._embedded.venues[0].city.name;
        let eventsCountry = data._embedded.events[0]._embedded.venues[0].country.name;
        if (eventsCountry === "United States Of America") {
            eventsCountry = "USA";
        }


        let upcomingEventsCityHtml = '';
        upcomingEventsCityHtml += `<div class="eventCity"><h2>Upcoming events in ${eventsCity}, ${eventsCountry}</h2></div>`;
        upcomingEventsCityHtml += `<div class="event_container">`
        events.slice(0, 20).forEach((event, index) => {
            const eventName = event.name;
            const eventDate = event.dates?.start?.localDate;
            const eventImage = event.images[0].url;
            const eventVenue = event._embedded.venues[0].name || '';
            let eventGenre = event.classifications[0].genre.name || '';
            if (eventGenre === 'Undefined') {
                eventGenre = '';
            }
            upcomingEventsCityHtml += `<div class="event_item">`;
            upcomingEventsCityHtml += `<a href="/show/show.html">`;
            upcomingEventsCityHtml += `<div class="eventPresentation">`;
            upcomingEventsCityHtml += `<h3 class="eventIndex">${index}</h3>`;
            upcomingEventsCityHtml += `<h2>${eventName}</h2>`;
            upcomingEventsCityHtml += `<img class="eventImage" src="${eventImage}"/>`;

            upcomingEventsCityHtml += `<h3>${eventGenre}</h3>`
            upcomingEventsCityHtml += `<h4 class="eventDate">${eventDate}</h4>`;
            upcomingEventsCityHtml += `<h3 class="eventVenue">${eventVenue}</h3>`;
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `<div class="event_attractions">`;
            const attractions = event._embedded?.attractions || [];
            attractions.slice(1, 20).forEach(attraction => {
                upcomingEventsCityHtml += `<div class="event_attraction">`;
                const artist = attraction.name;
                const artistPictureOne = attraction.images?.[0].url;
                upcomingEventsCityHtml += `<h2>${artist}</h2>`;
                upcomingEventsCityHtml += `<img class="artist_image" src="${artistPictureOne}"><br>`;
                upcomingEventsCityHtml += `</a>`;
                upcomingEventsCityHtml += `</div>`;
            });
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `</div>`;
        });
        upcomingEventsCityHtml += `</div>`;
        upcomingEventsCityHtml += `</div>`;
        townToPresent.innerHTML = upcomingEventsCityHtml;

        document.querySelectorAll('.event_item').forEach(item => {
            item.addEventListener('click', function () {
                const clickedArtist = this.querySelector('h2').textContent;
                const eventDate = this.querySelector(".eventDate").textContent;
                const eventVenue = this.querySelector(".eventVenue").textContent;
                const eventIndex = this.querySelector(".eventIndex").textContent;
                sessionStorage.setItem("urlToFetch", showUrlToFetch);
                sessionStorage.setItem("clickedArtist", clickedArtist);
                sessionStorage.setItem("eventDate", eventDate);
                sessionStorage.setItem("eventVenue", eventVenue);
                sessionStorage.setItem("urlToFetch", showUrlToFetch);
                console.log(showUrlToFetch)
                sessionStorage.setItem("eventIndex", eventIndex);
            });
        });

        const displayEventsOnResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                townToPresent.innerHTML = upcomingEventsCityHtml;
            };
        };

        window.addEventListener('resize', displayEventsOnResize);


    } catch (err) {
        console.error(err);
        presentLosAngeles.innerHTML = `<p>${err}</p>`;
    };
};

fetchEventsTicketmaster(324);

// boutons villes
// a - text decoration: none
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
// - page show
// - villes
// - refacto
// - mettre en ligne
// - scrapping