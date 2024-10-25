export const saveConcertAndTour = async (event) => {
    let tourId;

    // Check if the tour already exists
    try {
        const existingTourRes = await fetch(`http://localhost:5000/api/tours?name=${encodeURIComponent(event.name)}`, {
            method: 'GET',
        });

        if (existingTourRes.ok) {
            const existingTour = await existingTourRes.json();
            if (existingTour && existingTour.id) {
                tourId = existingTour.id; // Use the existing tour ID
            }
        }
    } catch (err) {
        console.error('Error checking for existing tour:', err);
    }

    // Create the tour if it doesn't exist
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
            tour_picture_url: event.images[0]?.url, // Include the event image URL
        };
        console.log("springbreak: " + tourData.tour_picture_url);

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

    // Save the venue if it doesn't exist
    const venueData = {
        name: event._embedded.venues[0]?.name,
        city: event._embedded.venues[0]?.city?.name,
        country: event._embedded.venues[0]?.country?.name,
    };

    try {
        const existingVenueRes = await fetch('http://localhost:5000/api/venues/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: venueData.name }),
        });

        const existingVenue = await existingVenueRes.json();

        if (!existingVenue.exists) {
            await fetch('http://localhost:5000/api/venues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(venueData),
            });
        }
    } catch (err) {
        console.error('Error saving venue:', err);
    }

    // Check if the specific concert already exists
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
            return; // Exit the function if the concert already exists
        }
    } catch (err) {
        console.error('Error checking for existing concert:', err);
        return;
    }

    // Save the individual concert linked to the tour
    const concertData = {
        tour_id: tourId,
        artist: artist,
        venue: venue,
        concert_date: concertDate,
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