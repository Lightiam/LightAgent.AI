import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommandCenter from './CommandCenter';

function Dashboard({ logout }) {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <Link to="/" className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          LightRail.dev
        </Link>
        <div className="nav-links">
          <button onClick={logout} className="button secondary-button">Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Tools</h3>
          <ul className="tools-list">
            <li className="active">Chat</li>
            <li>Files</li>
            <li>Browser</li>
            <li>Shell</li>
          </ul>
        </div>
        
        <div className="main-content">
          <CommandCenter />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
