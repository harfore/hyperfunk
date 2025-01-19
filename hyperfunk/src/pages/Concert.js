import React, { useState } from 'react';

function ConcertDetails({ concert }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                <strong>{concert.venue}</strong> - {concert.concert_date} {isOpen ? '▲' : '▼'}
            </div>
            {isOpen && (
                <div>
                    <p>{concert.something_special}</p>
                    <img src={concert.concert_picture_1} alt="Concert" />
                </div>
            )}
        </div>
    );
}

export default ConcertDetails;
