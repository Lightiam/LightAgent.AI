import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">LightRail.dev</div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="button primary-button">Sign Up</Link>
        </div>
      </nav>
      
      <div className="hero container">
        <div className="hero-content">
          <h1 className="text-4xl font-bold mb-4">LightRail AI</h1>
          <p className="text-xl mb-6">
            Your intelligent AI assistant for solving complex tasks
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="button primary-button mr-4">Get Started</Link>
            <a href="#features" className="button secondary-button">Learn More</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="chat-preview">
            <div className="chat-preview-header">
              <div className="preview-title">Chat with LightRail AI</div>
            </div>
            <div className="chat-preview-messages">
              <div className="preview-message agent-message">
                Hello! I'm LightRail AI. How can I help you today?
              </div>
              <div className="preview-message user-message">
                Can you help me analyze this dataset?
              </div>
              <div className="preview-message agent-message">
                Of course! I can help you analyze your dataset. Please upload the file or share more details about what you're looking for.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="features" className="features container">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2">Information Processing</h3>
            <p>Get answers to complex questions with fact-checking and information verification</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2">Content Creation</h3>
            <p>Generate articles, reports, documentation, and creative content</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
            <p>Break down complex problems into manageable steps with detailed solutions</p>
          </div>
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-2">Code Generation</h3>
            <p>Create and edit code in various programming languages</p>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <div className="container">
          <div className="logo">LightRail.dev</div>
          <p>&copy; 2025 LightRail AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
