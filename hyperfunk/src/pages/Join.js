import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import JoinStyle from '../styles/JoinStyle.css';

const Join = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        handle: '',
        country: '',
        pronouns: ''
    });
    const [error, setError] = useState('');

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
        // Add other validations as needed...
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
            });
            console.log('User created and info saved!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='formInputArea'>
                <input type="email" name="email" placeholder="email" onChange={handleChange} value={formData.email} required />
                <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password} required />
                <input type="text" name="username" placeholder="username" onChange={handleChange} value={formData.username} required />
                <input type="text" name="handle" placeholder="handle" onChange={handleChange} value={formData.handle} required />
                <input type="text" name="country" placeholder="country" onChange={handleChange} value={formData.country} />
                <input type="text" name="pronouns" placeholder="pronouns" onChange={handleChange} value={formData.pronouns} />

                <button type="submit">Create Account</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display errors */}
        </form>
    );
};

export default Join;
