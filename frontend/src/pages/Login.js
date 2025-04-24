import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      login();
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <Link to="/" className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          LightRail.dev
        </Link>
      </nav>

      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ 
          maxWidth: '450px', 
          width: '100%', 
          padding: '2.5rem', 
          borderRadius: '1rem', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            marginBottom: '1.5rem',
            color: 'white',
            textAlign: 'center'
          }}>
            Log In to LightRail AI
          </h2>
          
          {error && (
            <div style={{ 
              padding: '0.75rem', 
              marginBottom: '1rem', 
              borderRadius: '0.5rem', 
              backgroundColor: 'rgba(239, 68, 68, 0.2)', 
              color: 'white',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.875rem'
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="password" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.875rem'
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="button primary-button"
              style={{ 
                width: '100%', 
                marginBottom: '1.5rem',
                padding: '0.75rem 1.5rem'
              }}
            >
              Log In
            </button>
          </form>
          
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
            <p>Don't have an account? <Link to="/signup" style={{ color: 'white', fontWeight: '500' }}>Join Now</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
