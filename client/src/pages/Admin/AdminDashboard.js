import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Manage users, opportunities, and system settings here.</p>
      
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Active Opportunities</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
