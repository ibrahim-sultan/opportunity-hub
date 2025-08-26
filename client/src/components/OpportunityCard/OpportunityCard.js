import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OpportunityCard.css';

const OpportunityCard = ({ opportunity }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/opportunities/${opportunity._id}`);
  };

  const getTypeColor = (type) => {
    const colors = {
      'internship': '#4CAF50',
      'volunteer': '#2196F3',
      'training': '#FF9800',
      'mentorship': '#9C27B0'
    };
    return colors[type] || '#666';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDeadlineNear = () => {
    const deadline = new Date(opportunity.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="opportunity-card" onClick={handleCardClick}>
      <div className="card-header">
        <span 
          className="opportunity-type"
          style={{ backgroundColor: getTypeColor(opportunity.type) }}
        >
          {opportunity.type}
        </span>
        {isDeadlineNear() && (
          <span className="deadline-warning">⚠️ Deadline Soon</span>
        )}
      </div>

      <div className="card-content">
        <h3 className="opportunity-title">{opportunity.title}</h3>
        <p className="organization">{opportunity.organization}</p>
        <p className="location">📍 {opportunity.location}</p>
        
        <p className="description">
          {opportunity.description.length > 100 
            ? `${opportunity.description.substring(0, 100)}...` 
            : opportunity.description}
        </p>

        <div className="card-footer">
          <div className="opportunity-meta">
            <span className="category">{opportunity.category}</span>
            <span className="stipend">
              {opportunity.stipend ? `$${opportunity.stipend}` : 'Unpaid'}
            </span>
          </div>
          
          <div className="deadline-info">
            <span className="deadline">
              Deadline: {formatDate(opportunity.deadline)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
