const displayEvent = async () => {
    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const urlToFetch = sessionStorage.getItem("urlToFetch");
        const res = await fetch(urlToFetch);

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await res.json();

        const eventIndex = sessionStorage.getItem("eventIndex");
        const pathToEvent = data._embedded?.events[eventIndex];
        const eventImages = pathToEvent?.images[1]?.url;
        const eventHeadline = sessionStorage.getItem("clickedArtist");
        const eventDate = sessionStorage.getItem("eventDate");
        const eventVenue = sessionStorage.getItem("eventVenue");
        const bookingLink = pathToEvent?.url;
        const genre = pathToEvent?.classifications[1]?.genre.name;
        const subGenre = pathToEvent?.classifications[2]?.subGenre.name;
        // const presaleStartDate = pathToEvent?.sales?.presales[0]?.startDateTime;
        const generalSaleStartDate = pathToEvent?.sales?.public.startDateTime;
        // const minPrice = pathToEvent?.classifications[0].priceRanges[0].min;
        // const maxPrice = pathToEvent?.classifications[0].priceRanges[0].max;
        // const seatMap = pathToEvent.seatmap.staticUrl;
        const eventPromoter = pathToEvent.promoter.name;
        const showPresentation = document.getElementById('eventChoice');


        let showEventHtmlContent = '';

        if (eventImages) {
            showEventHtmlContent += `<img class="eventImage" src="${eventImages}"/>`
        } else if (eventImages === 'Undefined') {
            eventImages = '';
        }
        if (eventHeadline) {
            showEventHtmlContent += `<h3>${eventHeadline}</h3>`
        } else if (eventHeadline === 'Undefined') {
            eventHeadline = '';
        }
        if (eventDate) {
            showEventHtmlContent += `<h4>${eventDate}</h4>`;
        } else if (eventDate === 'Undefined') {
            eventDate = '';
        }
        if (eventVenue) {
            showEventHtmlContent += `<h3>${eventVenue}</h3>`
        } else if (eventVenue === 'Undefined') {
            eventVenue = '';
        }
        if (bookingLink) {
            showEventHtmlContent += `<p>${bookingLink}</p>`
        } else if (bookingLink === 'Undefined') {
            bookingLink = '';
        }
        if (genre && subGenre) {
            showEventHtmlContent += `<p>${genre}, ${subGenre}</p>`
        } else if (genre === 'Undefined' || subGenre === "Undefined") {
            genre = '';
            subGenre = '';
        }
        if (generalSaleStartDate) {
            let newGeneralSaleStartDate = generalSaleStartDate.replace(/T|Z/g, " ")
            showEventHtmlContent += `<p>Tickets sale starts on ${newGeneralSaleStartDate}</p>`;
        } else if (generalSaleStartDate === "Undefined") {
            generalSaleStartDate = '';
        }

        // if (minPrice && maxPrice) {
        //     showEventHtmlContent += `Prices range from ${minPrice}$ to ${maxPrice}$.`;
        // } else {
        //     minPrice = '';
        //     maxPrice = '';
        // }



        if (eventPromoter) {
            showEventHtmlContent += `<p>Promoter: ${eventPromoter}</p>`
        } else if (eventPromoter === 'Undefined') {
            eventPromoter = '';
        }

        const bookingLinkButton = document.createElement('button');
        bookingLinkButton.className = 'button';
        bookingLinkButton.textContent = 'SHOW BOOKING LINK!';
        // showEventHtmlContent += bookingLinkButton.outerHTML;

        // bookingLinkButton.addEventListener('click', function () {
        //     bookingLinkButton.style.display = 'none';
        //     console.log("hiding link button")
        //     showEventHtmlContent += `<p><a href="${bookingLink}" target="_blank">${bookingLink}</a></p>`;
        //     console.log("displaying link");
        // });



        showPresentation.innerHTML = showEventHtmlContent;

    } catch (err) {
        console.error("An error has occured while fetching data:" + err);
    };
};

displayEvent();

//         // Construct HTML content for events and attractions
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