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
  
  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Basic features for personal use',
      features: [
        'Up to 100 messages per day',
        'Basic tool integrations',
        'Standard response time',
        'Community support'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'Advanced features for professionals',
      features: [
        'Unlimited messages',
        'All tool integrations',
        'Priority response time',
        'Email support',
        'Custom workflows',
        'API access'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'Complete solution for teams',
      features: [
        'Everything in Pro',
        'Dedicated instance',
        'Custom tool development',
        'Advanced security',
        'SLA guarantees',
        'Dedicated support',
        'Team management'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
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
      
      <div id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Pricing Plans</h2>
            <p>Choose the plan that fits your needs</p>
          </div>
          
          <div className="pricing-plans">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-plan ${plan.highlighted ? 'highlighted' : ''}`}
              >
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p>{plan.description}</p>
                </div>
                <div className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="plan-feature">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="plan-cta">
                  <Link to="/signup" className={`button ${plan.highlighted ? 'primary-button' : 'secondary-button'}`}>
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Build Your AI Workflow?</h2>
            <p>Start building intelligent AI agents today with LightRail AI</p>
            <Link to="/signup" className="button primary-button">Get Started for Free</Link>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>LightRail.dev</span>
            </div>
            <p>&copy; 2025 LightRail.dev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
