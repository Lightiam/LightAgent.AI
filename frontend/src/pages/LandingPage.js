import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const toolNodes = [
    { id: 1, size: 60, top: '20%', left: '70%', icon: '💻', label: 'Shell' },
    { id: 2, size: 50, top: '35%', left: '85%', icon: '📄', label: 'Files' },
    { id: 3, size: 70, top: '60%', left: '75%', icon: '🌐', label: 'Browser' },
    { id: 4, size: 55, top: '80%', left: '60%', icon: '📊', label: 'Data' },
    { id: 5, size: 45, top: '70%', left: '40%', icon: '🔍', label: 'Search' },
    { id: 6, size: 65, top: '40%', left: '30%', icon: '🤖', label: 'AI' },
  ];

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          LightRail.dev
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-link">Solutions</Link>
          <Link to="/" className="nav-link">Blog</Link>
          <Link to="/" className="nav-link">Pricing</Link>
          <Link to="/login" className="nav-link">Log In</Link>
          <Link to="/signup" className="button primary-button">Join Now</Link>
        </div>
      </nav>
      
      <div className="hero container">
        <div className="hero-content">
          <h1>
            Your Personal<br />
            AI Agent for<br />
            Powerful Task<br />
            Automation and<br />
            Tool Integration
          </h1>
          <p>
            LightRail AI is an advanced agent platform that executes complex workflows by
            integrating with your tools, processing information, and automating tasks through
            a powerful event-driven architecture with real-time communication.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="button primary-button">Try LightRail AI</Link>
            <a href="#features" className="button secondary-button">Explore Capabilities</a>
          </div>
        </div>

        <div className="network-visualization">
          {toolNodes.map((node) => (
            <div
              key={node.id}
              className="network-node"
              style={{
                width: `${node.size}px`,
                height: `${node.size}px`,
                top: node.top,
                left: node.left,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div style={{ fontSize: `${node.size * 0.4}px` }}>{node.icon}</div>
              <div style={{ fontSize: `${node.size * 0.2}px`, marginTop: '4px' }}>{node.label}</div>
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 5,
              backgroundColor: 'rgba(107, 70, 193, 0.3)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>LightRail</div>
            <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>AI Agent</div>
          </div>
        </div>
      </div>
      
      <div id="features" className="features container">
        <h2>Agent Capabilities</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Tool Integration</h3>
            <p>Connect with shell commands, file systems, browsers, and custom APIs through a unified interface</p>
          </div>
          <div className="feature-card">
            <h3>Event-Driven Architecture</h3>
            <p>Process events asynchronously with a modular agent loop for efficient task execution</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Communication</h3>
            <p>Interact with the agent through WebSocket connections for immediate responses and updates</p>
          </div>
          <div className="feature-card">
            <h3>Modular Planning</h3>
            <p>Break down complex tasks into manageable steps with dynamic execution paths</p>
          </div>
          <div className="feature-card">
            <h3>Extensible Framework</h3>
            <p>Add custom tools and modules to extend the agent's capabilities for specialized tasks</p>
          </div>
          <div className="feature-card">
            <h3>Workflow Automation</h3>
            <p>Automate repetitive tasks and complex workflows with intelligent decision-making</p>
          </div>
        </div>
      </div>
      
      <div className="partners container">
        <h3>Integrated with your favorite tools and services</h3>
        <div className="partner-logos">
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L5 15L20 25L35 15L20 5Z" fill="white" fillOpacity="0.7" />
              <text x="45" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">GitHub</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5H25V25H15V5Z" fill="white" fillOpacity="0.7" />
              <text x="35" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">VS Code</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="15" r="10" fill="white" fillOpacity="0.7" />
              <text x="35" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">Slack</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15C15 10.0294 19.0294 6 24 6C28.9706 6 33 10.0294 33 15C33 19.9706 28.9706 24 24 24C19.0294 24 15 19.9706 15 15Z" fill="white" fillOpacity="0.7" />
              <text x="40" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">Notion</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L25 15L15 25L5 15L15 5Z" fill="white" fillOpacity="0.7" />
              <text x="30" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">Jira</text>
            </svg>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 LightRail.dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
