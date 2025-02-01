import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TicketmasterService = () => {
    const location = useLocation();
    const dmaId = location.state?.dmaId;
    const city = location.state?.city;
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';
    const maxOccurrences = 3;

    useEffect(() => {
        const fetchEventsTicketmaster = async () => {
            const urlToFetch = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`;

            try {
                const res = await fetch(urlToFetch);
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                const allEvents = data._embedded?.events || [];
                const filteredEvents = filterEventsByName(allEvents, maxOccurrences);
                setEvents(filteredEvents || []);
            } catch (err) {
                setError(err.message);
            }
        };

        if (dmaId) fetchEventsTicketmaster();
    }, [dmaId, apiKey]);

    const filterEventsByName = (events, maxOccurrences) => {
        const eventCount = {};
        return events.filter(event => {
            const name = event.name;
            eventCount[name] = (eventCount[name] || 0) + 1;
            return eventCount[name] <= maxOccurrences;
        });
    };
}