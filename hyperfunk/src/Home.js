import React from 'react';
import './home/style.css';

const Home = () => {
    return (
        <div>
            <div className="main">
                <div className="left"></div>
                <div className="center">
                    <h1>Welcome to Hyperfunk, your #1 stop for all things live shows!</h1>
                    <h3>Share your experience with thousands of fans and don't miss your next favorite concert.
                    </h3>

                    <h3>Check out the upcoming events in...</h3>
                    <div id="towns">
                        <div className="cities_list">
                            {renderCityButton('LOS ANGELES', './home/upcomingEvents.html', './images/cities/LOS_ANGELES_CT.jpg')}
                            {renderCityButton('NEW YORK', './home/upcomingEvents.html', './images/cities/NEW_YORK_CT.jpg')}
                            {renderCityButton('TORONTO', './home/upcomingEvents.html', './images/cities/TORONTO_CT.jpg')}
                        </div>
                        <div className="cities_list">
                            {renderCityButton('NEW ORLEANS', './home/upcomingEvents.html', './images/cities/NEW_ORLEANS_CT.jpg')}
                            {renderCityButton('HOUSTON', './home/upcomingEvents.html', './images/cities/HOUSTON_CT.jpg')}
                            {renderCityButton('LONDON', './home/upcomingEvents.html', './images/cities/LONDON_CT.jpg')}
                        </div>
                    </div>
                    <br />
                </div>
                <div className="right"></div>
            </div>
        </div>
    );
};

const renderCityButton = (city, link, imgSrc) => {
    return (
        <div className="city" id={`activate${city.replace(" ", "")}`}>
            <img className="city_picture" src={imgSrc} alt={city} />
            <a href={link}>
                <button className='presentButton gradient-overlay'>{city}</button>
            </a>
        </div>
    );
};

export default Home;