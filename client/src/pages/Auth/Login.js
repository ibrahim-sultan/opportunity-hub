import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-overlay"></div>
      </div>
      
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-welcome">
            <div className="welcome-content">
              <div className="welcome-badge">
                <span className="badge-icon">✨</span>
                <span>Trusted by 500+ Youth</span>
              </div>
              <h1>Welcome Back!</h1>
              <p>Sign in to continue your journey with OpportunityHub and discover amazing opportunities in Igbaja.</p>
              <div className="welcome-features">
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <span className="feature-icon">🎯</span>
                  </div>
                  <div className="feature-content">
                    <span className="feature-title">Find Perfect Matches</span>
                    <span className="feature-desc">AI-powered opportunity matching</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <span className="feature-icon">📈</span>
                  </div>
                  <div className="feature-content">
                    <span className="feature-title">Track Your Progress</span>
                    <span className="feature-desc">Real-time application updates</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <span className="feature-icon">🏆</span>
                  </div>
                  <div className="feature-content">
                    <span className="feature-title">Earn Certificates</span>
                    <span className="feature-desc">Verified digital certificates</span>
                  </div>
                </div>
              </div>
              <div className="welcome-testimonial">
                <div className="testimonial-content">
                  <p>"OpportunityHub changed my life! Found my dream internship in just 2 weeks."</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">👩‍🎓</div>
                    <div className="author-info">
                      <span className="author-name">Fatima A.</span>
                      <span className="author-role">Software Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="auth-form-container">
            <div className="auth-form">
              <div className="form-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your account</p>
              </div>
              
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="auth-form-fields">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📧</span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
                
                <div className="form-options">
                  <label className="checkbox-wrapper">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                </div>
                
                <button type="submit" disabled={loading} className="auth-button">
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Sign In
                    </>
                  )}
                </button>
              </form>
              
              <div className="auth-divider">
                <span>or</span>
              </div>
              
              <div className="social-login">
                <button className="social-btn google-btn">
                  <span>🔍</span>
                  Continue with Google
                </button>
              </div>
              
              <div className="auth-footer">
                <p>
                  Don't have an account? 
                  <Link to="/register" className="auth-link">Create Account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
