import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) {
      setError('Please fill in all fields.');
      return;
    }

    axios.post("/api/register", formData)
      .then(() => {
        alert("Registration successful!");
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      })
      .catch(() => {
        alert("Error registering user.");
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Account</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="signup-btn">
            Register
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;