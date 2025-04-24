import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const networkNodes = [
    { id: 1, size: 60, top: '20%', left: '70%', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, size: 50, top: '35%', left: '85%', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, size: 70, top: '60%', left: '75%', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, size: 55, top: '80%', left: '60%', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { id: 5, size: 45, top: '70%', left: '40%', image: 'https://randomuser.me/api/portraits/women/90.jpg' },
    { id: 6, size: 65, top: '40%', left: '30%', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
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
            Unlock Top AI<br />
            Capabilities You<br />
            Thought Was<br />
            Out of Reach —<br />
            Now Just One<br />
            Click Away!
          </h1>
          <p>
            LightRail AI gives you access to advanced artificial intelligence capabilities
            that help you solve complex problems, generate content, and automate tasks
            with unprecedented ease and accuracy.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="button primary-button">Start Project</Link>
            <a href="#features" className="button secondary-button">Learn More</a>
          </div>
        </div>

        <div className="network-visualization">
          {networkNodes.map((node) => (
            <div
              key={node.id}
              className="network-node"
              style={{
                width: `${node.size}px`,
                height: `${node.size}px`,
                top: node.top,
                left: node.left,
              }}
            >
              <img
                src={node.image}
                alt="AI specialist"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
            }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>20k+</div>
            <div style={{ fontSize: '1rem', opacity: 0.8 }}>Specialists</div>
          </div>
        </div>
      </div>
      
      <div id="features" className="features container">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Information Processing</h3>
            <p>Get answers to complex questions with fact-checking and information verification</p>
          </div>
          <div className="feature-card">
            <h3>Content Creation</h3>
            <p>Generate articles, reports, documentation, and creative content</p>
          </div>
          <div className="feature-card">
            <h3>Problem Solving</h3>
            <p>Break down complex problems into manageable steps with detailed solutions</p>
          </div>
          <div className="feature-card">
            <h3>Code Generation</h3>
            <p>Create and edit code in various programming languages</p>
          </div>
        </div>
      </div>
      
      <div className="partners container">
        <h3>Trusted by innovative teams worldwide</h3>
        <div className="partner-logos">
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L5 15L20 25L35 15L20 5Z" fill="white" fillOpacity="0.7" />
              <text x="45" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">Dreamure</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5H25V25H15V5Z" fill="white" fillOpacity="0.7" />
              <text x="35" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">SWITCH.WIN</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="15" r="10" fill="white" fillOpacity="0.7" />
              <text x="35" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">5phere</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15C15 10.0294 19.0294 6 24 6C28.9706 6 33 10.0294 33 15C33 19.9706 28.9706 24 24 24C19.0294 24 15 19.9706 15 15Z" fill="white" fillOpacity="0.7" />
              <text x="40" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">PinSpace</text>
            </svg>
          </div>
          <div className="partner-logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L25 15L15 25L5 15L15 5Z" fill="white" fillOpacity="0.7" />
              <text x="30" y="20" fill="white" fillOpacity="0.7" fontFamily="Arial" fontSize="14" fontWeight="bold">Visionix</text>
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
