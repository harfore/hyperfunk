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
        events.slice(0, 10).forEach(event => {
            // htmlContent += `<p>${events.dates.start.localDate}</p>`
            const attractions = event._embedded?.attractions || [];
            attractions.forEach(attraction => {
                // const artist = attraction.name;
                // const bookingLink = attraction.url;
                // const spotifyArtistLink = attraction.externalLinks.spotify;
                // const youtubeArtistLink = attraction.externalLinks.youtube;
                // const instagramArtistLink = attraction.externalLinks.youtube;
                // const artistHomepageLink = attraction.externalLinks.homepage;

                htmlContent += `<br><h2>${attraction.name}</h2><br>`;
                // htmlContent += `<p>Date: ${dates.start.localDate}</p>`;
                htmlContent += `<p><img src="${attraction.images?.[0].url || ''}"><br></p>`;
                htmlContent += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
            });
        });

        // Update the 'present' element with constructed HTML content
        los_angeles.innerHTML = htmlContent;
    } catch (err) {
        console.error(err);
        // Update 'present' element with an error message
        los_angeles.innerHTML = `<p>${err}</p>`;
    };
};

presentCities.forEach(city, () => {
    city.addEventListener('click', () => {
        presentCities.forEach(content => {
            if (content !== city) {
                if (content.style.display !== 'none') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                };
            };
        });
    });
});

fetchEvents(324);

// boutons villes