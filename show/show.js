const displayEvent = async () => {
    try {
        const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
        const urlToFetch = sessionStorage.getItem("urlToFetch");
        const res = await fetch(urlToFetch);

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await res.json();

        const eventIndex = sessionStorage.getItem("eventIndex"); // getting the right event from upcomingEvents page
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
        };
        if (eventHeadline) {
            showEventHtmlContent += `<h3>${eventHeadline}</h3>`
        } else if (eventHeadline === 'Undefined') {
            eventHeadline = '';
        };
        if (eventDate) {
            showEventHtmlContent += `<h4>${eventDate}</h4>`;
        } else if (eventDate === 'Undefined') {
            eventDate = '';
        };
        if (eventVenue) {
            showEventHtmlContent += `<h3>${eventVenue}</h3>`
        } else if (eventVenue === 'Undefined') {
            eventVenue = '';
        };
        if (bookingLink) {
            showEventHtmlContent += `<p>${bookingLink}</p>`
        } else if (bookingLink === 'Undefined') {
            bookingLink = '';
        };
        if (genre && subGenre) {
            showEventHtmlContent += `<p>${genre}, ${subGenre}</p>`
        } else if (genre === 'Undefined' || subGenre === "Undefined") {
            genre = '';
            subGenre = '';
        };
        if (generalSaleStartDate) {
            let newGeneralSaleStartDate = generalSaleStartDate.replace(/T|Z/g, " ");
            showEventHtmlContent += `<p>Tickets sale starts on ${newGeneralSaleStartDate}</p>`;
        } else if (generalSaleStartDate === "Undefined") {
            generalSaleStartDate = '';
        };

        // if (minPrice && maxPrice) {
        //     showEventHtmlContent += `Prices range from ${minPrice}$ to ${maxPrice}$.`;
        // } else {
        //     minPrice = '';
        //     maxPrice = '';
        // };

        if (eventPromoter) {
            showEventHtmlContent += `<p>Promoter: ${eventPromoter}</p>`
        } else if (eventPromoter === 'Undefined') {
            eventPromoter = '';
        };

        const bookingLinkButton = document.createElement('button');
        bookingLinkButton.className = 'button';
        bookingLinkButton.textContent = 'SHOW BOOKING LINK!';
        // showEventHtmlContent += bookingLinkButton.outerHTML;

        // bookingLinkButton.addEventListener('click', function () {
        //     bookingLinkButton.style.display = 'none';
        //     console.log("hiding link button");
        //     showEventHtmlContent += `<p><a href="${bookingLink}" target="_blank">${bookingLink}</a></p>`;
        //     console.log("displaying link");
        // });



        showPresentation.innerHTML = showEventHtmlContent;

    } catch (err) {
        console.error("An error has occured while fetching data:" + err);
    };
};

displayEvent();

// image, nom, date, lieu, booking link, sale date, promoter, socials (spotify, youtube, instagram), artistHomepage, seatMap

//         town.innerHTML = upcomingEventsCityHtml;
//         // showPresentation.innerHTML = artistChoiceHtml;
//         const displayEventsOnResize = () => {
//             if (window.matchMedia("(max-width: 768px)").matches) {
//                 town.innerHTML = upcomingEventsCityHtml;
//             }
//         };

//         window.addEventListener('resize', displayEventsOnResize);


// boutons villes
// a - text decoration: none
// villes console.log cities.js
// carousel tournées les plus populaires au dessus des villes
// hide custom pronouns input
// décalage
// htmlContent += `<p class='bookingLink' >Booking link: <u>${attraction.url}</u></p>`;
// htmlContent += `<p><a href="${attraction.externalLinks.homepage || '#'}">Artist Homepage</a></p>`;
// pricesRange;