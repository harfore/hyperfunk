let present = document.getElementById('present');

present.addEventListener('click', async (e) => {
    e.preventDefault(); // prevent default form behaviour
    try {
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a`);
        const data = await res.json();
        const events = data._embedded.events; // Assuming _embedded.events contains the events array

        present.innerHTML = ''; // Clear present element before appending new content

        for (let i = 0; i < events.length && i < 7; i++) {
            const event = events[i];
            const attractions = event._embedded.attractions; // Assuming each event has attractions array

            attractions.forEach(attraction => {
                present.innerHTML += `<br><br><h2>${attraction.name}</h2>`;
                present.innerHTML += `<p><a href="${attraction.externalLinks.youtube}">YouTube</a></p>`;
                present.innerHTML += `<p><a href="${attraction.externalLinks.spotify}">Spotify</a></p>`;
                present.innerHTML += `<p><a href="${attraction.externalLinks.instagram}">Instagram</a></p>`;
                present.innerHTML += `<p><a href="${attraction.externalLinks.homepage}">Artist Homepage</a></p>`;
                present.innerHTML += `<p><img src="${attraction.images[i]}"><br></p>`;
                present.innerHTML += `<p><img src="${attraction.images[i + 1]}"><br></p>`;
                present.innerHTML += `<p>${attraction.classifications.genre.name}</p>`;
                present.innerHTML += `<p><a href="${attraction.upcomingEvents.ticketmaster}">Ticketmaster</a></p>`;
                // images not external links
            });
        }
    } catch (err) {
        console.log(err);
        document.getElementById.innerHTML = `<p>${err}</p>`;
    }
});