import React from 'react';
import './SavedSearches.css';

const SavedSearches = ({ 
  savedSearches, 
  onApplySearch, 
  onDeleteSearch, 
  onClose 
}) => {
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    
    try {
      await onDeleteSearch(id);
    } catch (error) {
      console.error('Failed to delete saved search:', error);
    }
  };

  const formatFilters = (filters) => {
    const activeFilters = [];
    
    if (filters.search) activeFilters.push(`"${filters.search}"`);
    if (filters.type) activeFilters.push(`Type: ${filters.type}`);
    if (filters.category) activeFilters.push(`Category: ${filters.category}`);
    if (filters.state) activeFilters.push(`State: ${filters.state}`);
    if (filters.lga) activeFilters.push(`LGA: ${filters.lga}`);
    if (filters.remote) activeFilters.push('Remote only');
    if (filters.minStipend) activeFilters.push(`Min: ₦${filters.minStipend}`);
    if (filters.maxStipend) activeFilters.push(`Max: ₦${filters.maxStipend}`);
    if (filters.education) activeFilters.push(`Education: ${filters.education}`);
    if (filters.experience) activeFilters.push(`Experience: ${filters.experience}`);
    if (filters.skills && filters.skills.length > 0) {
      activeFilters.push(`Skills: ${filters.skills.join(', ')}`);
    }
    
    return activeFilters.length > 0 ? activeFilters.join(' • ') : 'No filters applied';
  };

  return (
    <div className="saved-searches-overlay">
      <div className="saved-searches-modal">
        <div className="saved-searches-header">
          <h3>Saved Searches</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        
        <div className="saved-searches-content">
          {savedSearches.length === 0 ? (
            <div className="no-searches">
              <div className="no-searches-icon">📋</div>
              <h4>No saved searches yet</h4>
              <p>Save your search criteria to quickly access them later</p>
            </div>
          ) : (
            <div className="searches-list">
              {savedSearches.map(search => (
                <div key={search._id} className="search-item">
                  <div className="search-info">
                    <h4 className="search-name">{search.name}</h4>
                    <p className="search-filters">
                      {formatFilters(search.filters)}
                    </p>
                    <div className="search-meta">
                      <span className="search-date">
                        📅 Saved on {new Date(search.createdAt).toLocaleDateString()}
                      </span>
                      {search.lastUsed && (
                        <span className="last-used">
                          🕒 Last used {new Date(search.lastUsed).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="search-actions">
                    <button
                      className="apply-btn"
                      onClick={() => {
                        onApplySearch(search);
                        onClose();
                      }}
                      title="Apply this search"
                    >
                      🔍 Apply
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(search._id, search.name)}
                      title="Delete this search"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="saved-searches-footer">
          <p className="tip">
            💡 Tip: Use the "Save" button in the search filters to save your current search
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;
