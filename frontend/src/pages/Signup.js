import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ login }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      login();
      navigate('/dashboard');
    } catch (error) {
      setError('Error creating account');
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <Link to="/" className="logo">LightRail.dev</Link>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h2 className="text-2xl font-bold mb-6">Create your LightRail AI Account</h2>
          
          {error && <div className="error-message mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="name" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            
            <div className="form-group mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            
            <div className="form-group mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            
            <div className="form-group mb-6">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            
            <button type="submit" className="button primary-button w-full mb-4">
              Sign Up
            </button>
          </form>
          
          <div className="text-center">
            <p>Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
