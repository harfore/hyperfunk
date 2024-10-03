import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle from '../styles/HeaderStyle.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);

                const userDoc = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setUserName(docSnap.data().handle || 'User');
                } else {
                    console.log("No such document!");
                }
            } else {
                setIsLoggedIn(false);
                setUserName(null);
            }
        });
        return () => unsubscribe();
    }, [auth, db]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Error during sign out: ", error);
        }
    };

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
                <button className="element" onClick={handleSignOut}>
                    <h2>Disconnect</h2>
                </button>
            )}

            <Link className="element" to="/profilez">
                <h2>Profiles</h2>
            </Link>

            <input name="artist_search" className="artist_search" placeholder="..."></input>
        </header>
    );
}

export default Header;