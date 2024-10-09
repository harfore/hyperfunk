import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import JoinStyle from '../styles/JoinStyle.css';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        handle: '',
        country: '',
        pronouns: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/'); // Redirect to home if user is logged in
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Form validation logic (e.g. for email, username, handle, password)
        if (formData.username.length < 3 || formData.username.length > 22) {
            setError('Username must be between 3 and 22 characters');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Invalid email format');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Save additional user info to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: formData.email,
                username: formData.username,
                handle: formData.handle,
                country: formData.country,
                pronouns: formData.pronouns,
                createdAt: Timestamp.fromDate(new Date())
            });
            console.log('User created and info saved!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='account_form'>
                <h1>Join Hyperfunk!</h1>
                <input type="email" name="email" title="Please write your email." className='account_field' placeholder="email" onChange={handleChange} value={formData.email} required />
                <input type="password" name="password" title="Please choose a password." className='account_field' placeholder="password" onChange={handleChange} value={formData.password} required />
                <input type="text" name="username" title="Please pick a username." className='account_field' placeholder="username" onChange={handleChange} value={formData.username} required />
                <input type="text" name="handle" title="Please choose a handle." className='account_field' placeholder="handle" onChange={handleChange} value={formData.handle} required />
                <input type="text" name="country" title="What country are you joining from?" className='account_field' placeholder="country" onChange={handleChange} value={formData.country} />
                <input type="text" name="pronouns" title="How would you like to be adressed?" className='account_field' placeholder="pronouns" onChange={handleChange} value={formData.pronouns} />
                <button type="submit" className='account_field'>Create Account</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Join;
