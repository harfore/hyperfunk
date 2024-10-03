import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate(); // why doesn't it redirect ?
    const user = auth.currentUser; // Get the current user
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    navigate('/login');
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, [db, user]);

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