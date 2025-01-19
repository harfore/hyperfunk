import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Tour() {
    const { id } = useParams(); // Get the tour ID from the URL
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/tours/${id}`);
                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`Error fetching tour details: ${response.status} ${response.statusText}, Details: ${errorDetails}`);
                }
                const data = await response.json();
                setTour(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!tour) return <p>Tour not found</p>;

    return (
        <div>
            <h2>{tour.name}</h2>
            <img src={tour.tour_picture_url} alt={tour.name} />
            <p>{tour.description}</p>
            <h3>Concert Dates:</h3>
            <ul>
                {tour.concerts.map(concert => (
                    <li key={concert.id}>
                        <strong>{concert.venue}</strong> - {concert.concert_date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tour;
