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
        const events = data._embedded?.events || [];

        const eventsCity = data._embedded.events[0]._embedded.venues[0].city.name;
        let eventsCountry = data._embedded.events[0]._embedded.venues[0].country.name;

        if (eventsCountry === "United States Of America") {
            eventsCountry = "USA";
        };

        const townMap = {
            324: 'presentLosAngeles',
            345: 'presentNewYork',
            299: 'presentToronto',
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

            if (eventGenre === 'Undefined' || eventGenre === 'Other') {
                eventGenre = '';
            };

            upcomingEventsCityHtml += `<div class="event_item">`;
            upcomingEventsCityHtml += `<a href="../show/show.html">`;
            upcomingEventsCityHtml += `<div class="eventPresentation">`;
            upcomingEventsCityHtml += `<h3 style="display: none;" class="eventIndex">${index}</h3>`;
            upcomingEventsCityHtml += `<h2 class="event_name">${eventName}</h2>`;
            upcomingEventsCityHtml += `<h3 class="event_date">${eventDate}</h2>`;
            upcomingEventsCityHtml += `</a>`;
            upcomingEventsCityHtml += `<img class="event_image" src="${eventImage}"/>`;

            // upcomingEventsCityHtml += `<h4 class="eventDate">${eventDate}</h4>`;
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `<div class="event_attractions">`;
            // const attractions = event._embedded?.attractions || [];
            // attractions.slice(1, 40).forEach(attraction => {
            //     upcomingEventsCityHtml += `<div class="event_attraction">`;
            //     const artist = attraction.name;
            //     const artistPictureOne = attraction.images?.[0].url;
            //     upcomingEventsCityHtml += `<h2>${artist}</h2>`;
            //     upcomingEventsCityHtml += `<img class="artist_image" src="${artistPictureOne}"><br>`;
            //     upcomingEventsCityHtml += `</div>`;
            // });
            upcomingEventsCityHtml += `</div>`;
            upcomingEventsCityHtml += `</div>`;
        });
        upcomingEventsCityHtml += `</div>`;
        upcomingEventsCityHtml += `</div>`;
        townToPresent.innerHTML = upcomingEventsCityHtml;

        Array.from(document.querySelectorAll('.event_item')).forEach((item, index) => {
            item.addEventListener('click', function () {
                const clickedArtist = this.querySelector('.event_name').textContent;
                const eventIndex = this.querySelector('.eventIndex').textContent;

                // Get the corresponding event data
                const event = events[index];
                const eventDate = event.dates?.start?.localDate;
                const eventVenue = event._embedded.venues[0].name;

                // Send the event data to "show" page via sessionStorage
                sessionStorage.setItem("urlToFetch", showUrlToFetch);
                sessionStorage.setItem("clickedArtist", clickedArtist);
                sessionStorage.setItem("eventDate", eventDate);
                sessionStorage.setItem("eventVenue", eventVenue);
                sessionStorage.setItem("eventIndex", eventIndex);
            });
        });


    } catch (err) {
        console.error(err);
    };
};

fetchEventsTicketmaster();