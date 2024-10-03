import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } else {
                // Redirect if no user is logged in
                navigate('/login');
            }
            setLoading(false);
        });

        // Clean up the listener
        return () => unsubscribe();
    }, [db, navigate, auth]);

    if (loading) return <p>Loading...</p>

    return (
        <div>
            {userData ? (
                <div>
                    <h2>{userData.username}</h2>
                    <p>Handle: {userData.handle}</p>
                    <p>Country: {userData.country}</p>
                    <p>Pronouns: {userData.pronouns}</p>
                    <p>{userData.username} has been a Hyperfunk user since {userData.createdAt.toDate().toLocaleDateString()}</p>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    )
}

export default Profile;