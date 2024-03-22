const clickedArtist = sessionStorage.getItem("clickedArtist");
const pathToArtist = sessionStorage.getItem("path to clicked artist ");

console.log("FRE: " + clickedArtist);
console.log("AK: " + pathToArtist);


const showPresentation = document.getElementById('artistChoice');

const fetchEvents = async (dmaId) => {

    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`);

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await res.json();
        const events = data._embedded?.events || [];
    }} // TAKE OFF

//         // Construct HTML content for events and attractions
//         let upcomingEventsCityHtml = '';
//         let artistChoiceHtml = '';
//         upcomingEventsCityHtml += `<div class="event_container">`
//         // upcomingEventsCityHtml += `<h2>${_embedded.events[0]._embedded.venues[0].city.name},${_embedded.events[0]._embedded.venues[0].state.name},${_embedded.events[0]._embedded.venues[0].country.countryCode}</h2>`
//         events.slice(0, 10).forEach(event => {
//             // upcomingEventsCityHtml += `<p>${events.dates.start.localDate}</p>`
//             const attractions = event._embedded?.attractions || [];
//             // const artist = attraction.name;
//             // const bookingLink = attraction.url;
//             // const spotifyArtistLink = attraction.externalLinks.spotify;
//             // const youtubeArtistLink = attraction.externalLinks.youtube;
//             // const instagramArtistLink = attraction.externalLinks.youtube;
//             // const artistHomepageLink = attraction.externalLinks.homepage;
//             attractions.forEach(attraction => {
//                 upcomingEventsCityHtml += `<div class="event_item">`;
//                 upcomingEventsCityHtml += `<h2>${attraction.name}</h2>`;
//                 console.log(attraction.name)
//                 // upcomingEventsCityHtml += `<p>Date: ${dates.start.localDate}</p>`;
//                 upcomingEventsCityHtml += `<img class="event_image" src="${attraction.images?.[0].url || ''}"><br>`;
//                 upcomingEventsCityHtml += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
//                 upcomingEventsCityHtml += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
//                 upcomingEventsCityHtml += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
//                 upcomingEventsCityHtml += `</a>`;
//                 upcomingEventsCityHtml += `</div>`;
//                 artistChoiceHtml += `<h2>${attraction.name}</h2>`;
//                 artistChoiceHtml += `<img class="event_image" src="${attraction.images?.[0].url || ''}"><br>`;
//                 artistChoiceHtml += `<img class="artist_image" src=${attraction.images?.[0].url || ''}`;
//                 artistChoiceHtml += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
//                 artistChoiceHtml += ` <p> ${attraction.classifications?.subGenre?.name || ''}</p>`;
//             })
//         });
//         upcomingEventsCityHtml += `</div>`;
//         let town = '';
//         if (dmaId === 324) {
//             town = presentLosAngeles
//         }
//         town.innerHTML = upcomingEventsCityHtml;
//         // showPresentation.innerHTML = artistChoiceHtml;
//         const displayEventsOnResize = () => {
//             if (window.matchMedia("(max-width: 768px)").matches) {
//                 town.innerHTML = upcomingEventsCityHtml;
//             }
//         };

//         window.addEventListener('resize', displayEventsOnResize);


//     } catch (err) {
//         console.error(err);
//         presentLosAngeles.innerHTML = `<p>${err}</p>`;
//     };
// };

// fetchEvents(324);

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