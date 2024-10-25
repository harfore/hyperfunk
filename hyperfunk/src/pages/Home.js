import React from 'react';
import CityButton from '../components/CityButton';
import '../styles/HomeStyle.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Hyperfunk!</h1>
            <h3>Share your experience with thousands of
                fans and don't miss your next favorite concert.</h3>
            <h3>Check out the upcoming events in...</h3>
            <div>
                <ul className="cities_list">
                    <li><CityButton city="Los Angeles" /></li>
                    <li><CityButton city="New York" /></li>
                    <li><CityButton city="Toronto" /></li>
                    <li><CityButton city="New Orleans" /></li>
                    <li><CityButton city="Houston" /></li>
                    <li><CityButton city="London" /></li>
                    <li><CityButton city="Atlanta" /></li>
                    <li><CityButton city="Chicago" /></li>
                    <li><CityButton city="Indianapolis" /></li>
                </ul>
            </div>
        </div>
    )
};

export default Home;