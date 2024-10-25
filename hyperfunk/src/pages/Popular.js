import React, { useState, useEffect } from 'react';
import '../styles/UpcomingEventsStyle.css';

function AdminFavoriteTours() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/popular');
                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`Error fetching popular tours: ${response.status} ${response.statusText}, Details: ${errorDetails}`);
                }
                const data = await response.json();
                setFavorites(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Popular Tours</h2>
            <div className='event_container'>
                {favorites.length > 0 ? (
                    favorites.map(tour => (
                        <div className='event_item' key={tour.id}>
                            <h3>{tour.name}</h3>
                            <img src={tour.tour_picture_url} alt={`${tour.name}`} className='event_image' />
                        </div>

                    ))
                ) : (
                    <p>No favorite tours found.</p>
                )}
            </div>
        </div>
    );
}

export default AdminFavoriteTours;