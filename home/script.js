const fetchEventsTicketmaster = async () => {
    let dmaId = 324

    document.addEventListener('DOMContentLoaded', () => {
        const activateLosAngeles = document.getElementById('activateLosAngeles');
        const activateNewYork = document.getElementById('activateNewYork');
        const activateToronto = document.getElementById('activateToronto');
        const activateNewOrleans = document.getElementById('activateNewOrleans');
        const activateHouston = document.getElementById('activateHouston');
        const activateLondon = document.getElementById('activateLondon');

        activateLosAngeles.addEventListener('click', () => dmaId = 324);
        activateNewYork.addEventListener('click', () => dmaId = 345);
        activateToronto.addEventListener('click', () => dmaId = 327);
        activateNewOrleans.addEventListener('click', () => dmaId = 344);
        activateHouston.addEventListener('click', () => dmaId = 300);
        activateLondon.addEventListener('click', () => dmaId = 602);
    });


    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const showUrlToFetch = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`;
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`);

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await res.json();

        const presentLosAngeles = document.getElementById('presentLosAngeles');
        const presentNewYork = document.getElementById('presentNewYork');
        const presentToronto = document.getElementById('presentToronto');
        const presentNewOrleans = document.getElementById('presentNewOrleans');
        const presentHouston = document.getElementById('presentHouston');
        const presentLondon = document.getElementById('presentLondon');

        let townToPresent = '';
        if (dmaId === 324) { // dmaId determines from which town the data is going to be displayed
            townToPresent = presentLosAngeles;
        } else if (dmaId === 345) {
            townToPresent = presentNewYork;
        } else if (dmaId === 527) {
            townToPresent = presentToronto;
        } else if (dmaId === 344) {
            townToPresent = presentNewOrleans;
        } else if (dmaId === 300) {
            townToPresent = presentHouston;
        } else if (dmaId === 602) {
            townToPresent = presentLondon;
        } else {
            dmaId = 324;
        }

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
            upcomingEventsCityHtml += `<a href="../show/show.html">`;
            upcomingEventsCityHtml += `<div class="eventPresentation">`;
            upcomingEventsCityHtml += `<h3 style="display: none;" class="eventIndex">${index}</h3>`;
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
                upcomingEventsCityHtml += `<img class="artistImage" src="${artistPictureOne}"><br>`;
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
                // sending the data of the clicked event to "show" page
                sessionStorage.setItem("urlToFetch", showUrlToFetch);
                sessionStorage.setItem("clickedArtist", clickedArtist);
                sessionStorage.setItem("eventDate", eventDate);
                sessionStorage.setItem("eventVenue", eventVenue);
                sessionStorage.setItem("urlToFetch", showUrlToFetch);
                console.log(showUrlToFetch);
                sessionStorage.setItem("eventIndex", eventIndex);
            });
        });

        const displayEventsOnResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                townToPresent.innerHTML = upcomingEventsCityHtml;
            };
        }; // displaying a different amount of events per row depending on screen size

        window.addEventListener('resize', displayEventsOnResize);


    } catch (err) {
        console.error(err);
    };
    console.log("Displaying events in 3, 2, 1..");
};

fetchEventsTicketmaster(345);

// activateLosAngeles.addEventListener('click', () => fetchEventsTicketmaster(324));
// activateNewYork.addEventListener('click', () => fetchEventsTicketmaster(345));
// activateToronto.addEventListener('click', () => fetchEventsTicketmaster(527));
// activateNewOrleans.addEventListener('click', () => fetchEventsTicketmaster(344));
// activateHouston.addEventListener('click', () => fetchEventsTicketmaster(300));
// activateLondon.addEventListener('click', () => fetchEventsTicketmaster(602));

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