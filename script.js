const present = document.getElementById('los_angeles');
const contentToHide = document.getElementById('buttondiv');

present.addEventListener('click', () => {
    if (contentToHide.style.display !== 'none') {
        contentToHide.style.display = 'none'; // Hide the content
    } else {
        contentToHide.style.display = 'block'; // Show the content
    };
});

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

        events.slice(0, 5).forEach(event => {
            const attractions = event._embedded?.attractions || [];
            attractions.forEach(attraction => {
                htmlContent += `<br><br><h2>${attraction.name}</h2>`;
                htmlContent += `<p>Booking link: <u>${attraction.url}</u></p>`;
                if (attraction.externalLinks) {
                    htmlContent += `<p><a href="${attraction.externalLinks.youtube || '#'}">
                    <img src="/socials/ytb.jpg" alt="youtube link" class='social-containter' width="125" height="90">
                    </a></p>`;
                    htmlContent += `<p><a href="${attraction.externalLinks.spotify || '#'}">
                    <img src="/socials/spotify.jpg" alt="spotify link" class='social-container' width="125" height="95">
                    </a></p>`;
                    htmlContent += `<p><a href="${attraction.externalLinks.instagram || '#'}">
                    <img src="/socials/instagram.png" alt="spotify link" class='social-container' width="125" height="110">
                    </a></p>`;
                    htmlContent += `<p><a href="${attraction.externalLinks.homepage || '#'}">Artist Homepage</a></p>`;
                }
                htmlContent += `<p><img src="${attraction.images?.[0] || ''}"><br></p>`;
                htmlContent += `<p><img src="${attraction.images?.[1] || ''}"><br></p>`;
                htmlContent += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
            });
        });

        // Update the 'present' element with constructed HTML content
        present.innerHTML = htmlContent;
    } catch (err) {
        console.error(err);
        // Update 'present' element with an error message
        present.innerHTML = `<p>${err}</p>`;
    };
};


const dmaIdToFetch = 330;
present.addEventListener('click', () => {
    fetchEvents(dmaIdToFetch);
    for (let i = 0; i < events.length; i++) {
        fetchEvents(events[i])
    }
});


// bouton atlanta
// background
// images