import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JoinStyle.css';

const Login = ({ handleSuccessfulLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            handleSuccessfulLogin(data.user);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && window.location.pathname !== '/login') {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='account_form'>
            <h1>Welcome back!</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="account_field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="account_field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="account_field">Login</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default Login;