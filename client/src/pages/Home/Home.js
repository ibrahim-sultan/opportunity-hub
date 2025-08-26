import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Empowering <span className="highlight">Rural Youth</span> in Igbaja
              </h1>
              <p className="hero-subtitle">
                Connect with meaningful internships and volunteer opportunities that shape your future, 
                build your skills, and strengthen your community.
              </p>
              <div className="hero-buttons">
                {!currentUser ? (
                  <>
                    <Link to="/register" className="btn btn-primary btn-large">
                      <span>🚀</span> Start Your Journey
                    </Link>
                    <Link to="/opportunities" className="btn btn-outline btn-large">
                      <span>🔍</span> Explore Opportunities
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="btn btn-primary btn-large">
                      <span>📊</span> Go to Dashboard
                    </Link>
                    <Link to="/opportunities" className="btn btn-outline btn-large">
                      <span>🔍</span> Browse Opportunities
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-card">
                <div className="card-content">
                  <h3>🌟 Join Our Community</h3>
                  <div className="mini-stats">
                    <div className="mini-stat">
                      <strong>500+</strong>
                      <span>Active Members</span>
                    </div>
                    <div className="mini-stat">
                      <strong>200+</strong>
                      <span>Opportunities</span>
                    </div>
                    <div className="mini-stat">
                      <strong>95%</strong>
                      <span>Success Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-background">
          <div className="features-overlay"></div>
          <div className="features-particles">
            <div className="feature-particle feature-particle-1"></div>
            <div className="feature-particle feature-particle-2"></div>
            <div className="feature-particle feature-particle-3"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="features-header">
            <div className="features-badge">
              <span className="badge-icon">⚙️</span>
              <span className="badge-text">Simple Process</span>
            </div>
            <h2 className="features-title">
              How <span className="highlight-text">OpportunityHub</span> Works
            </h2>
            <p className="features-description">
              Your journey to career success starts with these <strong>simple, proven steps</strong> that have helped hundreds of youth in Igbaja
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card" data-step="01">
              <div className="feature-card-inner">
                <div className="feature-step-number">01</div>
                <div className="feature-icon">
                  <div className="icon-wrapper">
                    <span className="icon-bg">👤</span>
                    <div className="icon-glow"></div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Create Your Profile</h3>
                  <p>Build a comprehensive profile showcasing your skills, interests, education, and career aspirations with our guided setup.</p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">✨</span>
                      <span>Skills assessment</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">💼</span>
                      <span>Portfolio showcase</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🎯</span>
                      <span>Goal setting</span>
                    </div>
                  </div>
                  <div className="feature-cta">
                    <span className="cta-text">Get started in 5 minutes</span>
                    <span className="cta-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature-card" data-step="02">
              <div className="feature-card-inner">
                <div className="feature-step-number">02</div>
                <div className="feature-icon">
                  <div className="icon-wrapper">
                    <span className="icon-bg">🎯</span>
                    <div className="icon-glow"></div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Discover Opportunities</h3>
                  <p>Browse curated internships and volunteer positions that perfectly match your profile and career goals using our smart algorithm.</p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">🤖</span>
                      <span>Smart matching</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🌍</span>
                      <span>Local & remote options</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🔍</span>
                      <span>Skill-based filtering</span>
                    </div>
                  </div>
                  <div className="feature-cta">
                    <span className="cta-text">500+ opportunities available</span>
                    <span className="cta-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature-card" data-step="03">
              <div className="feature-card-inner">
                <div className="feature-step-number">03</div>
                <div className="feature-icon">
                  <div className="icon-wrapper">
                    <span className="icon-bg">📝</span>
                    <div className="icon-glow"></div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Apply with Confidence</h3>
                  <p>Submit professional applications with our guided process and track your progress in real-time with personalized feedback.</p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">📄</span>
                      <span>Application templates</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">📊</span>
                      <span>Progress tracking</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🎤</span>
                      <span>Interview preparation</span>
                    </div>
                  </div>
                  <div className="feature-cta">
                    <span className="cta-text">85% success rate</span>
                    <span className="cta-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature-card" data-step="04">
              <div className="feature-card-inner">
                <div className="feature-step-number">04</div>
                <div className="feature-icon">
                  <div className="icon-wrapper">
                    <span className="icon-bg">🏆</span>
                    <div className="icon-glow"></div>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Earn Recognition</h3>
                  <p>Complete experiences and receive verified certificates to build your professional portfolio and advance your career prospects.</p>
                  <div className="feature-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">🏅</span>
                      <span>Digital certificates</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">✔️</span>
                      <span>Skill verification</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🚀</span>
                      <span>Career advancement</span>
                    </div>
                  </div>
                  <div className="feature-cta">
                    <span className="cta-text">Build your portfolio</span>
                    <span className="cta-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="features-bottom">
            <div className="features-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Youth Helped</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Partner Organizations</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <div className="container">
          <div className="section-header">
            <h2>Our Impact in Igbaja</h2>
            <p>Transforming lives and strengthening communities through meaningful connections</p>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">500+</div>
              <h3>Youth Empowered</h3>
              <p>Rural youth connected with life-changing opportunities</p>
            </div>
            <div className="impact-card">
              <div className="impact-number">200+</div>
              <h3>Active Opportunities</h3>
              <p>Internships and volunteer positions available</p>
            </div>
            <div className="impact-card">
              <div className="impact-number">150+</div>
              <h3>Certificates Earned</h3>
              <p>Professional certifications awarded to participants</p>
            </div>
            <div className="impact-card">
              <div className="impact-number">50+</div>
              <h3>Partner Organizations</h3>
              <p>Local businesses and NGOs creating opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Hear from youth who transformed their futures through OpportunityHub</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"OpportunityHub connected me with an internship that changed my life. I gained real-world experience and built confidence in my abilities."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍🎓</div>
                <div className="author-info">
                  <h4>Fatima A.</h4>
                  <span>Software Development Intern</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Through volunteering opportunities on this platform, I discovered my passion for community development and found my career path."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <h4>Ibrahim M.</h4>
                  <span>Community Development Volunteer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The certification I earned helped me stand out to employers. Now I'm working full-time in my dream field!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <h4>Aisha K.</h4>
                  <span>Digital Marketing Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-background">
          <div className="cta-overlay"></div>
          <div className="cta-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <span className="badge-icon">✨</span>
              <span className="badge-text">Join Our Community</span>
            </div>
            
            <h2 className="cta-title">
              Ready to <span className="highlight-text">Transform</span> Your Future?
            </h2>
            
            <p className="cta-description">
              Join hundreds of ambitious rural youth in Igbaja who are building successful careers through meaningful experiences. 
              <strong>Your transformation journey starts today!</strong>
            </p>
            
            <div className="cta-stats">
              <div className="cta-stat">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Success Stories</span>
                </div>
              </div>
              <div className="cta-stat">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support Available</span>
                </div>
              </div>
              <div className="cta-stat">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-number">Free</span>
                  <span className="stat-label">Always & Forever</span>
                </div>
              </div>
            </div>
            
            <div className="cta-buttons">
              {!currentUser ? (
                <>
                  <Link to="/register" className="btn btn-cta-primary">
                    <span className="btn-icon">🚀</span>
                    <span className="btn-text">
                      <span className="btn-main">Start Your Journey</span>
                      <span className="btn-sub">Create free account</span>
                    </span>
                  </Link>
                  <Link to="/opportunities" className="btn btn-cta-secondary">
                    <span className="btn-icon">👀</span>
                    <span className="btn-text">
                      <span className="btn-main">Browse First</span>
                      <span className="btn-sub">View opportunities</span>
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/opportunities" className="btn btn-cta-primary">
                    <span className="btn-icon">🔍</span>
                    <span className="btn-text">
                      <span className="btn-main">Explore Opportunities</span>
                      <span className="btn-sub">Find your perfect match</span>
                    </span>
                  </Link>
                  <Link to="/dashboard" className="btn btn-cta-secondary">
                    <span className="btn-icon">📊</span>
                    <span className="btn-text">
                      <span className="btn-main">View Dashboard</span>
                      <span className="btn-sub">Track your progress</span>
                    </span>
                  </Link>
                </>
              )}
            </div>
            
            <div className="cta-trust">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>100% Secure & Private</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⭐</span>
                <span>Trusted by 500+ Youth</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💯</span>
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
