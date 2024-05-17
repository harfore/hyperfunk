const fetchEventsTicketmaster = async () => {
    const dmaId = sessionStorage.getItem("dmaId");
    const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
    const showUrlToFetch = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`;
    try {
        const res = await fetch(showUrlToFetch);

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

        const events = data._embedded?.events || [];

        const eventsCity = data._embedded.events[0]._embedded.venues[0].city.name;
        let eventsCountry = data._embedded.events[0]._embedded.venues[0].country.name;
        if (eventsCountry === "United States Of America") {
            eventsCountry = "USA";
        };

        const townMap = {
            324: 'presentLosAngeles',
            345: 'presentNewYork',
            527: 'presentToronto',
            344: 'presentNewOrleans',
            300: 'presentHouston',
            602: 'presentLondon'
        };

        const townToPresent = document.getElementById(townMap[dmaId]);
        if (!townToPresent) return;


        let upcomingEventsCityHtml = '';
        upcomingEventsCityHtml += `<div class="eventCity"><h2>Upcoming events in ${eventsCity}, ${eventsCountry}</h2></div>`;
        upcomingEventsCityHtml += `<div class="event_container">`;

        events.slice(0, 40).forEach((event, index) => {
            const eventName = event.name;
            const eventDate = event.dates?.start?.localDate;
            const eventImage = event.images[0].url;
            const eventVenue = event._embedded.venues[0].name || '';
            let eventGenre = event.classifications[0].genre.name || '';
            if (eventGenre === 'Undefined' || 'Other') {
                eventGenre = '';
            };
            upcomingEventsCityHtml += `<div class="event_item">`;
            upcomingEventsCityHtml += `<a href="../show/show.html">`;
            upcomingEventsCityHtml += `<div class="eventPresentation">`;
            upcomingEventsCityHtml += `<h3 style="display: none;" class="eventIndex">${index}</h3>`;
            upcomingEventsCityHtml += `<h2 class="event_name">${eventName}</h2>`;
            upcomingEventsCityHtml += `</a>`;
            upcomingEventsCityHtml += `<img class="event_image" src="${eventImage}"/>`;

            upcomingEventsCityHtml += `<h3>${eventGenre}</h3>`;
            upcomingEventsCityHtml += `<h4 class="eventDate">${eventDate}</h4>`;
            upcomingEventsCityHtml += `<h3 class="eventVenue">${eventVenue}</h3>`;
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `<div class="event_attractions">`;
            const attractions = event._embedded?.attractions || [];
            attractions.slice(1, 40).forEach(attraction => {
                upcomingEventsCityHtml += `<div class="event_attraction">`;
                const artist = attraction.name;
                const artistPictureOne = attraction.images?.[0].url;
                upcomingEventsCityHtml += `<h2>${artist}</h2>`;
                upcomingEventsCityHtml += `<img class="artist_image" src="${artistPictureOne}"><br>`;
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
};

fetchEventsTicketmaster()