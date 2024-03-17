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
const presentAmsterdam = document.getElementById('presentAmsterdam')

const activateCities = [activateLosAngeles, activateRioDeJaneiro, activateParisFrance, activateSingapore, activateTokyoJapan, activateAmsterdam];

const fetchEvents = async (dmaId) => {

    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`);

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await res.json();
        const events = data._embedded?.events || [];

        // Construct HTML content for events and attractions
        let htmlContent = '';
        htmlContent += `<div class="event_container">`
        // htmlContent += `<h2>${_embedded.events[0]._embedded.venues[0].city.name},${_embedded.events[0]._embedded.venues[0].state.name},${_embedded.events[0]._embedded.venues[0].country.countryCode}</h2>`
        events.slice(0, 10).forEach(event => {
            // htmlContent += `<p>${events.dates.start.localDate}</p>`
            const attractions = event._embedded?.attractions || [];
            // const artist = attraction.name;
            // const bookingLink = attraction.url;
            // const spotifyArtistLink = attraction.externalLinks.spotify;
            // const youtubeArtistLink = attraction.externalLinks.youtube;
            // const instagramArtistLink = attraction.externalLinks.youtube;
            // const artistHomepageLink = attraction.externalLinks.homepage;
            attractions.forEach(attraction => {
                htmlContent += `<div class="event_item">`
                htmlContent += `<a href="/show/show.html">`
                htmlContent += `<h2>${attraction.name}</h2>`;
                console.log(attraction.name)
                // htmlContent += `<p>Date: ${dates.start.localDate}</p>`;
                htmlContent += `<img class="event_image" src="${attraction.images?.[0].url || ''}"><br>`;
                htmlContent += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `</a>`
                htmlContent += `</div>`

            })
        });
        htmlContent += `</div>`;
        let town = '';
        if (dmaId === 324) {
            town = presentLosAngeles
        }
        town.innerHTML = htmlContent;
        const displayEventsOnResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                town.innerHTML = htmlContent; // Re-render events
            }
        };

        // Add event listener for screen resize
        window.addEventListener('resize', displayEventsOnResize);


    } catch (err) {
        console.error(err);
        town.innerHTML = `<p>${err}</p>`;
    };
};

fetchEvents(324);

// boutons villes
// a - text decoration: none
// villes console.log cities.js
// carousel tournées les plus populaires au dessus des villes
// hide custom pronouns input