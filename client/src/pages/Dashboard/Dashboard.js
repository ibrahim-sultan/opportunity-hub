import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    appliedOpportunities: 0,
    completedOpportunities: 0,
    certificates: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, applicationsResponse] = await Promise.all([
        axios.get('/api/dashboard/stats'),
        axios.get('/api/applications/recent')
      ]);

      setStats(statsResponse.data);
      setRecentApplications(applicationsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName}!</h1>
        <p>Here's what's happening with your opportunities</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.totalOpportunities}</h3>
            <p>Total Opportunities</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.appliedOpportunities}</h3>
            <p>Applied</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedOpportunities}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{stats.certificates}</h3>
            <p>Certificates</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/opportunities" className="action-btn">
            <span>🔍</span>
            Find Opportunities
          </Link>
          <Link to="/applications" className="action-btn">
            <span>📋</span>
            View Applications
          </Link>
          <Link to="/certificates" className="action-btn">
            <span>🏆</span>
            My Certificates
          </Link>
          <Link to="/profile" className="action-btn">
            <span>👤</span>
            Update Profile
          </Link>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="recent-applications">
        <h2>Recent Applications</h2>
        {recentApplications.length > 0 ? (
          <div className="applications-list">
            {recentApplications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="application-info">
                  <h4>{application.opportunity?.title}</h4>
                  <p>{application.opportunity?.organization}</p>
                  <span className={`status ${application.status}`}>
                    {application.status}
                  </span>
                </div>
                <div className="application-date">
                  {new Date(application.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-applications">No recent applications found</p>
        )}
      </div>

      {/* Recommendations */}
      <div className="recommendations">
        <h2>Recommended for You</h2>
        <div className="recommendation-cards">
          <div className="recommendation-card">
            <h4>Digital Marketing Internship</h4>
            <p>Learn social media marketing and digital skills</p>
            <Link to="/opportunities" className="btn btn-sm">View Details</Link>
          </div>
          <div className="recommendation-card">
            <h4>Community Health Volunteer</h4>
            <p>Make a difference in local healthcare</p>
            <Link to="/opportunities" className="btn btn-sm">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
