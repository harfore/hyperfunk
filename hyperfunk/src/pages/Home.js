import React from 'react';
import CityButton from '../components/CityButton';
import HomeStyle from '../styles/HomeStyle.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Welcome to Hyperfunk!</h2>
            <h3>Check out the upcoming events in...</h3>
            <div className="cities">
                <CityButton city="Los Angeles" />
                <CityButton city="New York" />
                <CityButton city="Toronto" />
                <CityButton city="New Orleans" />
                <CityButton city="Houston" />
                <CityButton city="London" />
            </div>
        </div>
    );
};

export default Home;