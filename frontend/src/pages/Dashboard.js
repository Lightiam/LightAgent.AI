import React from 'react';
import CommandCenter from '../components/CommandCenter';

function Dashboard({ logout }) {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">LightRail.dev</div>
        <div className="nav-links">
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
