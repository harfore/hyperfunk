import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventItem from '../components/EventItem';
import UpcomingEventsStyle from '../styles/UpcomingEventsStyle.css';

const UpcomingEvents = () => {
    const location = useLocation();
    const dmaId = location.state?.dmaId;
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const apiKey = 'QpKB72Ay4A8yTodIl5QYlNGRFfSJ457a';

    useEffect(() => {
        const fetchEventsTicketmaster = async () => {
            const showUrlToFetch = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${dmaId}&apikey=${apiKey}`;

            try {
                const res = await fetch(showUrlToFetch);
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data._embedded?.events || []);
            } catch (err) {
                setError(err.message);
            }
        };

        if (dmaId) fetchEventsTicketmaster();
    }, [dmaId, apiKey]);

    if (error) return <div>Error: {error}</div>;
    if (!events.length) return <div>Loading events...</div>;

    const handleEventClick = (event) => setSelectedEvent(event);

    return (
        <div>
            <h1>Upcoming Events</h1>
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
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingEvents;
