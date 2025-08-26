import React from 'react';
import './Certificates.css';

const Certificates = () => {
  return (
    <div className="certificates-container">
      <h1>My Certificates</h1>
      <p>View and manage your certificates here.</p>
      <div className="certificates-list">
        <p>No certificates found.</p>
      </div>
    </div>
  );
};

export default Certificates;
