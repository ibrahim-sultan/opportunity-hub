import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SavedSearches from './components/SavedSearches';
import './Opportunities.css';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    location: '',
    duration: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('/api/opportunities');
      setOpportunities(response.data);
      setFilteredOpportunities(response.data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(filters, term);
  };

  const applyFilters = (currentFilters, currentSearchTerm) => {
    let filtered = opportunities;

    // Apply search term
    if (currentSearchTerm) {
      filtered = filtered.filter(opp =>
        opp.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        opp.organization.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );
    }

    // Apply filters
    Object.keys(currentFilters).forEach(key => {
      if (currentFilters[key]) {
        filtered = filtered.filter(opp => opp[key] === currentFilters[key]);
      }
    });

    setFilteredOpportunities(filtered);
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

  if (loading) {
    return (
      <div className="opportunities-loading">
        <div className="spinner"></div>
        <p>Loading opportunities...</p>
      </div>
    );
  }

  return (
    <div className="opportunities">
      <div className="opportunities-header">
        <h1>Find Opportunities</h1>
        <p>Discover internships, volunteer positions, and training programs</p>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="internship">Internship</option>
            <option value="volunteer">Volunteer</option>
            <option value="training">Training</option>
            <option value="mentorship">Mentorship</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="technology">Technology</option>
            <option value="agriculture">Agriculture</option>
            <option value="business">Business</option>
            <option value="community">Community Service</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="filter-select"
          >
            <option value="">All Locations</option>
            <option value="igbaja">Igbaja</option>
            <option value="ilorin">Ilorin</option>
            <option value="offa">Offa</option>
            <option value="online">Online/Remote</option>
          </select>

          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange('duration', e.target.value)}
            className="filter-select"
          >
            <option value="">All Durations</option>
            <option value="1-4 weeks">1-4 weeks</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        <p>{filteredOpportunities.length} opportunities found</p>
      </div>

      {/* Opportunities Grid */}
      <div className="opportunities-grid">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <div key={opportunity._id} className="opportunity-card">
              <div className="opportunity-header">
                <span 
                  className="opportunity-type"
                  style={{ backgroundColor: getTypeColor(opportunity.type) }}
                >
                  {opportunity.type}
                </span>
                <span className="opportunity-category">{opportunity.category}</span>
              </div>

              <div className="opportunity-content">
                <h3>{opportunity.title}</h3>
                <p className="organization">{opportunity.organization}</p>
                <p className="description">{opportunity.description}</p>

                <div className="opportunity-details">
                  <div className="detail">
                    <span className="label">Location:</span>
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Duration:</span>
                    <span>{opportunity.duration}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Stipend:</span>
                    <span>{opportunity.stipend || 'Unpaid'}</span>
                  </div>
                </div>

                <div className="opportunity-footer">
                  <span className="deadline">
                    Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                  </span>
                  <Link 
                    to={`/opportunities/${opportunity._id}`} 
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-opportunities">
            <h3>No opportunities found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
