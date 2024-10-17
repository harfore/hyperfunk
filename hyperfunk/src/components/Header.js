import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderStyle.css';

function Header({ isLoggedIn, userName, onSignOut }) {
    return (
        <header className="banner">
            <Link className="element" to="/">
                <h2>Hyperfunk</h2>
            </Link>

            {isLoggedIn ? (
                <Link className="element" to="/profile">
                    <h2>{userName}</h2>
                </Link>
            ) : (
                <>
                    <Link className="element" to="/login">
                        <h2>Login</h2>
                    </Link>
                    <Link className="element" to="/join">
                        <h2>Join</h2>
                    </Link>
                </>
            )}

            {isLoggedIn && (
                <button className="element" onClick={onSignOut}>
                    <h2>Disconnect</h2>
                </button>
            )}

            <Link className="element" to="/users">
                <h2>Users</h2>
            </Link>

            <input name="artist_search" className="artist_search" placeholder="..." />
        </header>
    );
}

export default Header;