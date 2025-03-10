import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventItem from '../components/EventItem';
import { saveConcertAndTour } from '../services/concertService';
import '../styles/UpcomingEventsStyle.css';

const UpcomingEvents = () => {
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
            const showUrlToFetch = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`;

            try {
                const res = await fetch(showUrlToFetch);
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

    if (error) return <div>We're having trouble loading events at the moment: {error}</div>;
    if (!events.length) return <div>Loading events...</div>;

    const handleEventClick = async (event) => {
        setSelectedEvent(event);
        await saveConcertAndTour(event); // save the concert and tour on click
    };

    return (
        <div>
            <h1>Upcoming Events in {city}</h1>
            {selectedEvent ? (
                <EventItem event={selectedEvent} setSelectedEvent={setSelectedEvent} />
            ) : (
                <div className="event_container">
                    {events.map((event, index) => {
                        const eventName = event.name;
                        const eventDate = event.dates?.start?.localDate;

                        const eventImage = event.images[0]?.url;

                        return (
                            <div className="event_item" key={index} onClick={() => handleEventClick(event)}>
                                <div className="eventPresentation">
                                    <h2 className="event_name">{eventName}</h2>
                                    <h3 className="event_date">{eventDate}</h3>
                                    {eventImage && <img className="event_image" src={eventImage} alt={eventName} />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;