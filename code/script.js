const afficheresultat = document.getElementById('resultat')
buttontest.addEventListener('click', async (e) => {
    // prevent default form behaviour
    e.preventDefault()

    try {
        console.log(result)
        document.getElementById('buttontest').style.display = 'none'
        document.getElementById('start').style.display = 'block'
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a`);
        const data = await res.json();
        console.log(data)
        for (i = 0; i < 4; i++) {
            afficheresultat.innerHTML += `<br><br><h2>` + _embedded.events._embedded.attractions.name + `</h2>`
            afficheresultat.innerHTML += _embedded.events._embedded.attractions.externalLinks.youtube
            afficheresultat.innerHTML += _embedded.events._embedded.attractions.externalLinks.spotify
            afficheresultat.innerHTML += _embedded.events._embedded.attractions.externalLinks.instagram
            afficheresultat.innerHTML += _embedded.events._embedded.attractions.externalLinks.homepage
            afficheresultat.innerHTML += `<img src="${_embedded.events._embedded.attractions.externalLinks.images[i]}"><br>`
            afficheresultat.innerHTML += `<img src="${_embedded.events._embedded.attractions.externalLinks.images[i + 1]}"><br>`
            afficheresultat.innerHTML += _embedded.events._embedded.attractions.classifications.genre.name
            afficheresultat.innerHTML += _embedded.events._embedded.attractions.upcomingEvents.ticketmaster
            afficheresultat.innerHTML += `<u>Duration:</u> ` + data.data[i].duration + `<br><br>`
            afficheresultat.innerHTML += `<u>Year :</u> ` + data.data[i].year + `<br><br>`
            afficheresultat.innerHTML += `<u>Score :</u> ` + data.data[i].score + `<br><br><br>`
        }
    } catch (err) {
        console.log(err);
        topp.innerHTML = `<p>${err}</p>`;
    }
})
// name, url, youtube, spotify, instagram, homepage, images, genre, upcoming events
// _embedded/events/_embedded/attractions/name