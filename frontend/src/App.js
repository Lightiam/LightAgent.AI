import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup login={login} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
