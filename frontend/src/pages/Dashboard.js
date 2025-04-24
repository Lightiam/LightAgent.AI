import React from 'react';
import CommandCenter from '../components/CommandCenter';
import { Link } from 'react-router-dom';

function Dashboard({ logout }) {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6b46c1" />
            <path d="M2 17L12 22L22 17" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          LightRail.dev
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <button onClick={logout} className="button secondary-button">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <CommandCenter />
      </div>
    </div>
  );
}

export default Dashboard;
