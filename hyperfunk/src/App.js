import '../src/styles/App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import UpcomingEvents from './pages/UpcomingEvents';
import Login from './pages/Login';
import Join from './pages/Join';
import Profile from './pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Parsed user from localStorage:', user);
    if (user) {
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
    console.log('Signed out');
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userName={userName} onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<UpcomingEvents />} />
        <Route path="/login" element={<Login handleSuccessfulLogin={handleSuccessfulLogin} />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;