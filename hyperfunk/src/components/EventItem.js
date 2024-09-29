import React from 'react';

const EventItem = ({ event, setSelectedEvent }) => {
    const eventDate = event.dates?.start?.localDate;
    const eventVenue = event._embedded.venues[0]?.name || 'Venue not available';
    const eventImage = event.images[0]?.url || 'default_image_url.png';

    const handleBack = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="event_item_details">
            <button onClick={handleBack}>Back to Events</button>
            <h2>{event.name}</h2>
            <h3>{eventDate}</h3>
            <h3>{eventVenue}</h3>
            {eventImage && <img className="event_image_large" src={eventImage} alt={event.name} />}
            <p>{event.classifications[0]?.genre.name || ''}</p>
            {/* Additional event details can go here */}
        </div>
    );
};

export default EventItem;
