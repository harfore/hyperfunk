const activateLosAngeles = document.getElementById('activateLosAngeles');
const activateRioDeJaneiro = document.getElementById('activateRioDeJaneiro');
const activateParisFrance = document.getElementById('activateParisFrance');
const activateSingapore = document.getElementById('activateSingapore');
const activateTokyoJapan = document.getElementById('activateTokyoJapan');
const activateAmsterdam = document.getElementById('activateAmsterdam');
const presentLosAngeles = document.getElementById('los_angeles');

const presentCities = [activateLosAngeles, activateRioDeJaneiro, activateParisFrance, activateSingapore, activateTokyoJapan, activateAmsterdam];

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
                htmlContent += `<h2>${attraction.name}</h2>`;
                console.log(attraction.name)
                // htmlContent += `<p>Date: ${dates.start.localDate}</p>`;
                htmlContent += `<img class="event_image" src="${attraction.images?.[0].url || ''}"><br>`;
                htmlContent += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `</div>`

            })
        });
        htmlContent += `</div>`;
        presentLosAngeles.innerHTML = htmlContent;
        const displayEventsOnResize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                presentLosAngeles.innerHTML = htmlContent; // Re-render events
            }
        };

        // Add event listener for screen resize
        window.addEventListener('resize', displayEventsOnResize);


    } catch (err) {
        console.error(err);
        presentLosAngeles.innerHTML = `<p>${err}</p>`;
    };
};

fetchEvents(324);

// boutons villes