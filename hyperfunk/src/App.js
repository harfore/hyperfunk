import '../src/styles/App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import UpcomingEvents from './pages/UpcomingEvents';
import Login from './pages/Login';
import Join from './pages/Join';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
