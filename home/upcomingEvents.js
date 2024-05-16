const fetchEventsTicketmaster = async () => {
    const dmaId = sessionStorage.getItem("dmaId")
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
        console.log("London div: " + presentLondon);

        console.log("dmaId equals " + dmaId)
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
        } // else {
        //     dmaId = 324;
        // };

        const events = data._embedded?.events || [];

        const eventsCity = data._embedded.events[0]._embedded.venues[0].city.name;
        let eventsCountry = data._embedded.events[0]._embedded.venues[0].country.name;
        if (eventsCountry === "United States Of America") {
            eventsCountry = "USA";
        };


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