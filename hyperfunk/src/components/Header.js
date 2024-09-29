import React from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle from '../styles/HeaderStyle.css'

function Header() {
    return (
        <header className="banner">
            <Link className="element" to="/">
                <h2>Hyperfunk</h2>
            </Link>
            <Link className="element" to="/remi_profile">
                <h2>remi</h2>
            </Link>
            <Link className="element" to="/login">
                <h2>Login</h2>
            </Link>
            <Link className="element" to="/join">
                <h2>Join</h2>
            </Link>
            <Link className="element" to="/profilez">
                <h2>Profiles</h2>
            </Link>
            <input name="artist_search" className="artist_search" placeholder="..."></input>
        </header>
    );
}

export default Header;