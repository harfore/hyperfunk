import React from 'react';
import EventItemStyle from '../styles/EventItemStyle.css'

const EventItem = ({ event, setSelectedEvent }) => {
    const eventDate = event.dates?.start?.localDate;
    const eventVenue = event._embedded.venues[0]?.name || 'Venue not available';
    const eventImage = event.images[0]?.url || 'default_image_url.png';
    let eventGenre = event.classifications[0]?.genre.name;

    if (eventGenre === "Other") {
        eventGenre = ' '
    }

    const handleBack = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="event_item_details">
            <h2>{event.name}</h2>
            <h3>{eventDate}, {eventVenue}</h3>
            {eventImage && <img className="event_image" src={eventImage} alt={event.name} />}
            <p>{eventGenre}</p>
            <button onClick={handleBack} className='back_to_events_button'>BACK TO EVENTS</button>
        </div>
    )
}

export default EventItem;
