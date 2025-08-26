import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">🌟</div>
            <div className="logo-text">
              <span className="logo-main">OpportunityHub</span>
              <span className="logo-sub">Igbaja</span>
            </div>
          </Link>
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActiveLink('/') ? 'nav-link-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-icon">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/opportunities" 
                className={`nav-link ${isActiveLink('/opportunities') ? 'nav-link-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-icon">💼</span>
                <span>Opportunities</span>
              </Link>
            </li>
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link 
                    to="/dashboard" 
                    className={`nav-link ${isActiveLink('/dashboard') ? 'nav-link-active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-icon">📊</span>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item nav-dropdown">
                  <span className="nav-link nav-dropdown-toggle">
                    <span className="nav-icon">👤</span>
                    <span>Account</span>
                    <span className="dropdown-arrow">▼</span>
                  </span>
                  <ul className="nav-dropdown-menu">
                    <li>
                      <Link 
                        to="/profile" 
                        className="nav-dropdown-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="nav-icon">👤</span>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/applications" 
                        className="nav-dropdown-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="nav-icon">📝</span>
                        Applications
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/certificates" 
                        className="nav-dropdown-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="nav-icon">🏆</span>
                        Certificates
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/messages" 
                        className="nav-dropdown-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="nav-icon">💬</span>
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/settings" 
                        className="nav-dropdown-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="nav-icon">⚙️</span>
                        Settings
                      </Link>
                    </li>
                    {currentUser?.isAdmin && (
                      <li>
                        <Link 
                          to="/admin" 
                          className="nav-dropdown-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="nav-icon">🔧</span>
                          Admin
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="nav-link logout-btn"
                  >
                    <span className="nav-icon">🚪</span>
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link 
                    to="/login" 
                    className={`nav-link nav-link-login ${isActiveLink('/login') ? 'nav-link-active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-icon">🔑</span>
                    <span>Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/register" 
                    className={`nav-link nav-link-register ${isActiveLink('/register') ? 'nav-link-active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-icon">✨</span>
                    <span>Join Now</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-background">
          <div className="footer-overlay"></div>
        </div>
        
        <div className="footer-content">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section footer-brand">
                <div className="footer-logo">
                  <div className="logo-icon">🌟</div>
                  <div className="logo-text">
                    <span className="logo-main">OpportunityHub</span>
                    <span className="logo-sub">Igbaja</span>
                  </div>
                </div>
                <p className="footer-description">
                  Empowering rural youth in Igbaja through meaningful internships and volunteer opportunities. 
                  Building bridges to successful careers and community impact.
                </p>
                <div className="footer-social">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <span>📘</span>
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <span>🐦</span>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <span>💼</span>
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <span>📷</span>
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">Quick Links</h3>
                <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/opportunities">Browse Opportunities</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">For Youth</h3>
                <ul className="footer-links">
                  <li><Link to="/register">Create Account</Link></li>
                  <li><Link to="/internships">Find Internships</Link></li>
                  <li><Link to="/volunteer">Volunteer Work</Link></li>
                  <li><Link to="/certificates">Get Certified</Link></li>
                  <li><Link to="/success-stories">Success Stories</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">For Organizations</h3>
                <ul className="footer-links">
                  <li><Link to="/post-opportunity">Post Opportunity</Link></li>
                  <li><Link to="/partner">Become a Partner</Link></li>
                  <li><Link to="/employer-guide">Employer Guide</Link></li>
                  <li><Link to="/pricing">Pricing</Link></li>
                  <li><Link to="/support">Support</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">Contact Info</h3>
                <div className="footer-contact">
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <span>Igbaja, Kwara State, Nigeria</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span>hello@opportunityhub.ng</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>+234 (0) 123 456 7890</span>
                  </div>
                </div>
                
                <div className="footer-newsletter">
                  <h4>Stay Updated</h4>
                  <div className="newsletter-form">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="newsletter-input"
                    />
                    <button className="newsletter-btn">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <div className="footer-copyright">
                  <p>&copy; 2025 OpportunityHub Igbaja. All rights reserved.</p>
                </div>
                <div className="footer-legal">
                  <Link to="/privacy">Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/cookies">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
