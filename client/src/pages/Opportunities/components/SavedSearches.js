import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import './SavedSearches.css';

const SavedSearches = ({ onApplySearch }) => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchSavedSearches = useCallback(async () => {
    try {
      const response = await axios.get('/api/search/saved', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSavedSearches(response.data);
    } catch (err) {
      setError('Failed to load saved searches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this saved search?')) return;

    try {
      await axios.delete(`/api/search/saved/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSavedSearches(prev => prev.filter(search => search._id !== id));
    } catch (err) {
      alert('Failed to delete saved search');
    }
  };

  const handleApply = (search) => {
    onApplySearch(search.filters);
  };

  if (loading) return <div className="loading">Loading saved searches...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="saved-searches">
      <h3>Saved Searches</h3>
      {savedSearches.length === 0 ? (
        <p className="no-searches">No saved searches yet</p>
      ) : (
        <div className="searches-list">
          {savedSearches.map(search => (
            <div key={search._id} className="search-item">
              <div className="search-info">
                <h4>{search.name}</h4>
                <p className="search-date">
                  Saved on {new Date(search.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="search-actions">
                <button 
                  className="apply-btn"
                  onClick={() => handleApply(search)}
                >
                  Apply
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(search._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;
