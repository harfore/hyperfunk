const fetchEventsInTown = async () => {
    const url = 'https://concerts-artists-events-tracker.p.rapidapi.com/artist?name=Ed%20sheeran&page=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2f0070ca6bmshcef9001052a267cp173e79jsn53f58d3f6a15',
            'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

fetchEventsInTown();