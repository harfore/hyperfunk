export const saveConcertAndTour = async (event) => {
    let tourId;

    // check if the tour already exists in the database
    try {
        const existingTourRes = await fetch(`http://localhost:5000/api/tours?name=${encodeURIComponent(event.name)}`, {
            method: 'GET',
        });

        if (existingTourRes.ok) {
            const existingTour = await existingTourRes.json();
            if (existingTour && existingTour.id) {
                tourId = existingTour.id; // tour already exists, using the existing ID
            }
        }
    } catch (err) {
        console.error('Error checking for existing tour:', err);
    }

    // toue doesn't exist yet, creating it
    if (!tourId) {
        const tourData = {
            name: event.name,
            artist_id: event.artist_id,
            number_of_dates: event._embedded.venues.length,
            start_date: event.dates.start.localDate,
            end_date: event.dates.end?.localDate || event.dates.start.localDate,
            description: event.info || '',
            live_album: false,
            concert_film: false,
        };

        try {
            const tourRes = await fetch('http://localhost:5000/api/tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tourData),
            });

            if (!tourRes.ok) throw new Error('Failed to save tour');
            const tourResult = await tourRes.json();
            tourId = tourResult.id;
        } catch (err) {
            console.error('Error saving tour:', err);
            return;
        }
    }

    // check if the specific concert already exists
    const concertDate = event.dates.start.localDate;
    const artist = event.name;
    const venue = event._embedded.venues[0]?.name;

    try {
        const existingConcertRes = await fetch('http://localhost:5000/api/concerts/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artist, venue, concertDate }),
        });

        const existingConcert = await existingConcertRes.json();

        if (existingConcert.exists) {
            console.log('Concert already exists in the database.');
            return; // exit the function if the concert already exists
        }
    } catch (err) {
        console.error('Error checking for existing concert:', err);
        return;
    }

    // save the individual concert linked to the tour
    const concertData = {
        tour_id: tourId,
        artist: artist,
        venue: venue,
        concert_date: concertDate,
        concert_picture_1: event.images[0]?.url,
        concert_picture_2: event.images[1]?.url,
        concert_picture_3: event.images[2]?.url,
        something_special: event.info || '',
        user_count: 0,
        review: '',
        review_count: 0,
    };

    try {
        const res = await fetch('http://localhost:5000/api/concerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(concertData),
        });

        if (!res.ok) throw new Error('Failed to save concert');
        console.log('Concert saved successfully!');
    } catch (err) {
        console.error('Error saving concert:', err);
    }
};