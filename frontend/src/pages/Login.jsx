import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let handleSubmit = (e) => 
    {
        e.preventDefault();
        if (!formData.email || !formData.password) 
        {
            setError('Please fill in all fields.');
            return;
        }
        axios.post("https://anara-skills-foundation-student-reg-sigma.vercel.app/api/login", formData, { withCredentials: true })
        .then(() => {
            alert("Login successful!");
            setFormData({
            email: '',
            password: ''
            });
            navigate('/create');
        })
        .catch(() => {
            alert("Error logging in.");
        });
    };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome Back</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;