import '../src/styles/App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UpcomingEvents from './pages/UpcomingEvents';
import Login from './pages/Login';
import Join from './pages/Join';
import Profile from './pages/Profile';
import Popular from './pages/Popular';
import Tour from './pages/Tour';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      setIsLoggedIn(true);
      setUserName(user.handle);
    }
  }, []);

  const handleSuccessfulLogin = (user) => {
    setIsLoggedIn(true);
    setUserName(user.handle);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName(null);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} userName={userName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/login" element={<Login handleSuccessfulLogin={handleSuccessfulLogin} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/tour" element={<Tour />} />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile onSignOut={handleSignOut} /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;