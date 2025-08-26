import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './OpportunityDetail.css';

const OpportunityDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applicationText, setApplicationText] = useState('');

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      const response = await fetch(`/api/opportunities/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOpportunity(data);
      } else {
        setError('Opportunity not found');
      }
    } catch (error) {
      setError('Failed to fetch opportunity');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          opportunityId: id,
          applicationText
        })
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setApplicationText('');
      } else {
        alert('Failed to submit application');
      }
    } catch (error) {
      alert('Error submitting application');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!opportunity) return <div className="error">Opportunity not found</div>;

  return (
    <div className="opportunity-detail">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>
      
      <div className="opportunity-content">
        <h1>{opportunity.title}</h1>
        
        <div className="opportunity-meta">
          <span className="company">{opportunity.company}</span>
          <span className="location">{opportunity.location}</span>
          <span className="type">{opportunity.type}</span>
          <span className="deadline">Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
        </div>

        <div className="opportunity-description">
          <h3>Description</h3>
          <p>{opportunity.description}</p>
        </div>

        <div className="opportunity-requirements">
          <h3>Requirements</h3>
          <ul>
            {opportunity.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="opportunity-benefits">
          <h3>Benefits</h3>
          <ul>
            {opportunity.benefits?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {currentUser && (
          <div className="application-section">
            <h3>Apply for this opportunity</h3>
            <textarea
              value={applicationText}
              onChange={(e) => setApplicationText(e.target.value)}
              placeholder="Tell us why you're interested in this opportunity..."
              rows="4"
              className="application-text"
            />
            <button onClick={handleApply} className="apply-button">
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityDetail;
