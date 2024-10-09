import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import JoinStyle from '../styles/JoinStyle.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
            console.log('User logged in:', userCredential.user);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className='account_form'>
            <h1>Welcome back!</h1>
            <form onSubmit={handleLogin}>
                <input type="email" className="account_field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" className="account_field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="account_field">Login</button>
                {error && <div>{error}</div>}
            </form>
        </div >
    );
};

export default Login;