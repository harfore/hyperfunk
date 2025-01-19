import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';

describe('Header component', () => {
    test("shows 'Login' and 'Join' links when not logged in", () => {
        render(
            <Router>
                <Header isLoggedIn={false} />
            </Router>
        );

        expect(screen.getByText('Hyperfunk')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Join')).toBeInTheDocument();
        expect(screen.queryByText('Users')).toBeInTheDocument();
        expect(screen.queryByText(/Popular/i)).toBeInTheDocument();
    });

    test("displays the user's name and hides 'Login' and 'Join' when logged in", () => {
        const userName = 'TestUser';

        render(
            <Router>
                <Header isLoggedIn={true} userName={userName} />
            </Router>
        );

        expect(screen.getByText('Hyperfunk')).toBeInTheDocument();
        expect(screen.getByText(userName)).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('Join')).not.toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
    });
});
