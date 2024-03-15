const present = document.getElementById('los_angeles');
const los_angeles = document.getElementById('buttondiv');
const rioDeJaneiro = document.getElementById('riodejaneiro');
const parisFrance = document.getElementById('parisFrance');
const singapore = document.getElementById('singapore');
const tokyoJapan = document.getElementById('tokyo');
const amsterdam = document.getElementById('amsterdam');

const contentToHide = [los_angeles, rioDeJaneiro, parisFrance, singapore, tokyoJapan, amsterdam];

present.addEventListener('click', () => {
    contentToHide.forEach(content => {
        if (content.style.display !== 'none') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        };
    });
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
        events.slice(0, 10).forEach(event => {
            // htmlContent += `<p>${events.dates.start.localDate}</p>`
            const attractions = event._embedded?.attractions || [];
            attractions.forEach(attraction => {
                htmlContent += `<div class='upcomingEvent'>`;
                htmlContent += `<br><br><h2>${attraction.name}</h2><br>`;
                htmlContent += `<p class='bookingLink' >Booking link: <u>${attraction.url}</u></p>`;
                // htmlContent += `<p>Date: ${dates.start.localDate}</p>`;
                if (attraction.externalLinks) {
                    htmlContent += `<div class="social-container"><p><a href="${attraction.externalLinks.spotify || '#'}">
                    <img src="/socials/spotify.png" alt="spotify link" class='social-media' width="60" height="auto">
                    </a></p>`;
                    htmlContent += `<p><a href="${attraction.externalLinks.youtube || '#'}">
                    <img src="/socials/youtube.png" alt="youtube link" class='social-media' width="60" height="auto">
                    </a></p>`;
                    htmlContent += `<p><a href="${attraction.externalLinks.instagram || '#'}">
                    <img src="/socials/instagram.png" alt="spotify link" class='social-media' width="60" height="auto">
                    </a></p></div>`;
                    htmlContent += `<p><a href="${attraction.externalLinks.homepage || '#'}">Artist Homepage</a></p>`;
                }
                htmlContent += `<p><img src="${attraction.images?.[0] || ''}"><br></p>`;
                htmlContent += `<p><img src="${attraction.images?.[1] || ''}"><br></p>`;
                htmlContent += `<p>${attraction.classifications?.genre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p>`;
                htmlContent += `<p>${attraction.classifications?.subGenre?.name || ''}</p></div>`;
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


const dmaIdToFetch = 324;
present.addEventListener('click', () => {
    fetchEvents(dmaIdToFetch);
    const events = data._embedded?.events || [];
    for (let i = 0; i < events.length; i++) {
        fetchEvents(events[i])
    }
});


// boutons villes
// images