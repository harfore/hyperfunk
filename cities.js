const fetchCityData = async (dmaId) => {
    try {
        const cityDataList = [];
        const ukCitiesDataList = [];
        for (let i = 0; i < 600; i++) {
            const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
            const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`);

            if (!res.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await res.json();
            const city = data._embedded.events[0]._embedded.venues[0].city.name;
            const state = data._embedded.events[0]._embedded.venues[0].state.name;
            const stateCode = data._embedded.events[0]._embedded.venues[0].state.stateCode;
            const country = data._embedded.events[0]._embedded.venues[0].country.name;
            const cityData = [dmaId, city, country];
            cityDataList.push(cityData);

            const ukCityData = data._embedded.events[0]._embedded.venues[0].city.name;
            ukCitiesDataList.push(ukCityData);
            console.log(`ukCitiesData: ${ukCitiesDataList}`)
            dmaId++;
            // console.log(data._embedded.events[i].name)
            if (dmaId > 600) {
                return 'ok!';
            }
        }
    } catch (err) {
        console.error('error :' + err);
        return fetchCityData(dmaId + 1);

    }
}

fetchCityData(500)
    .then(cityDataList => {
        console.log(cityDataList);
    })
    .catch(error => {
        console.error(error);
    });
