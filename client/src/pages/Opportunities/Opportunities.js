import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import AdvancedSearch from '../../components/AdvancedSearch/AdvancedSearch';
import Pagination from '../../components/Pagination/Pagination';
import SavedSearches from './components/SavedSearches';
import './Opportunities.css';

const Opportunities = () => {
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const {
    searchState,
    results,
    suggestions,
    savedSearches,
    loading,
    suggestionsLoading,
    error,
    updateQuery,
    updateFilters,
    updateSorting,
    loadMore,
    resetSearch,
    saveSearch,
    applySavedSearch,
    deleteSavedSearch,
    hasMore,
    totalResults
  } = useSearch();

  const handleSaveSearch = async (name) => {
    try {
      await saveSearch(name);
      setSaveMessage('Search saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save search');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleApplySavedSearch = (savedSearch) => {
    applySavedSearch(savedSearch);
    setShowSavedSearches(false);
  };

  const handleDeleteSavedSearch = async (searchId) => {
    try {
      await deleteSavedSearch(searchId);
    } catch (error) {
      alert('Failed to delete saved search');
    }
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

  const formatStipend = (benefits) => {
    if (!benefits || !benefits.stipend || !benefits.stipend.amount) {
      return 'Unpaid';
    }
    return `₦${benefits.stipend.amount.toLocaleString()}`;
  };

  const formatLocation = (location) => {
    if (!location) return 'Not specified';
    
    if (location.isRemote) return 'Remote';
    
    const parts = [];
    if (location.lga) parts.push(location.lga);
    if (location.state) parts.push(location.state);
    
    return parts.length > 0 ? parts.join(', ') : 'Not specified';
  };

  return (
    <div className="opportunities">
      <div className="opportunities-header">
        <h1>Find Opportunities</h1>
        <p>Discover internships, volunteer positions, and training programs</p>
        
        {/* Header Actions */}
        <div className="header-actions">
          <button
            onClick={() => setShowSavedSearches(!showSavedSearches)}
            className="saved-searches-toggle"
          >
            📋 Saved Searches ({savedSearches.length})
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`save-message ${saveMessage.includes('Failed') ? 'error' : 'success'}`}>
          {saveMessage}
        </div>
      )}

      {/* Saved Searches */}
      {showSavedSearches && (
        <SavedSearches
          savedSearches={savedSearches}
          onApplySearch={handleApplySavedSearch}
          onDeleteSearch={handleDeleteSavedSearch}
          onClose={() => setShowSavedSearches(false)}
        />
      )}

      {/* Advanced Search */}
      <AdvancedSearch
        searchState={searchState}
        suggestions={suggestions}
        suggestionsLoading={suggestionsLoading}
        onQueryChange={updateQuery}
        onFiltersChange={updateFilters}
        onSortChange={updateSorting}
        onReset={resetSearch}
        onSaveSearch={handleSaveSearch}
      />

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && results.opportunities.length === 0 && (
        <div className="opportunities-loading">
          <div className="spinner"></div>
          <p>Searching opportunities...</p>
        </div>
      )}

      {/* Results */}
      {!loading || results.opportunities.length > 0 ? (
        <>
          {/* Results Summary */}
          <div className="results-summary">
            <div className="results-count">
              <strong>{totalResults.toLocaleString()}</strong> opportunities found
              {searchState.query && (
                <span className="search-query">for "{searchState.query}"</span>
              )}
            </div>
            
            {/* Active Filters */}
            <div className="active-filters">
              {Object.entries(searchState.filters).map(([key, value]) => {
                if (!value || value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
                  return null;
                }
                
                const displayValue = Array.isArray(value) ? value.join(', ') : value.toString();
                const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                
                return (
                  <span key={key} className="filter-chip">
                    {displayKey}: {displayValue}
                    <button
                      onClick={() => updateFilters({ [key]: Array.isArray(value) ? [] : '' })}
                      className="remove-filter"
                    >
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="opportunities-grid">
            {results.opportunities.length > 0 ? (
              results.opportunities.map((opportunity) => (
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
                    <p className="organization">
                      {opportunity.organization?.name || opportunity.organization}
                    </p>
                    <p className="description">
                      {opportunity.description?.length > 150 
                        ? `${opportunity.description.substring(0, 150)}...`
                        : opportunity.description
                      }
                    </p>

                    <div className="opportunity-details">
                      <div className="detail">
                        <span className="label">📍 Location:</span>
                        <span>{formatLocation(opportunity.location)}</span>
                      </div>
                      
                      {opportunity.duration && (
                        <div className="detail">
                          <span className="label">⏱️ Duration:</span>
                          <span>{opportunity.duration}</span>
                        </div>
                      )}
                      
                      <div className="detail">
                        <span className="label">💰 Stipend:</span>
                        <span>{formatStipend(opportunity.benefits)}</span>
                      </div>
                      
                      {opportunity.applicationDeadline && (
                        <div className="detail">
                          <span className="label">📅 Deadline:</span>
                          <span className="deadline">
                            {new Date(opportunity.applicationDeadline).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="opportunity-footer">
                      <div className="opportunity-meta">
                        <span className="posted-date">
                          Posted {new Date(opportunity.createdAt).toLocaleDateString()}
                        </span>
                        {opportunity.views && (
                          <span className="views">👁️ {opportunity.views} views</span>
                        )}
                      </div>
                      
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
            ) : !loading ? (
              <div className="no-opportunities">
                <div className="no-results-icon">🔍</div>
                <h3>No opportunities found</h3>
                <p>Try adjusting your search criteria or filters</p>
                <button onClick={resetSearch} className="reset-search-btn">
                  Clear All Filters
                </button>
              </div>
            ) : null}
          </div>

          {/* Pagination */}
          {results.opportunities.length > 0 && (
            <Pagination
              currentPage={results.pagination.page}
              totalPages={results.pagination.pages}
              totalResults={results.pagination.total}
              resultsPerPage={results.pagination.limit}
              onPageChange={(page) => {
                // For traditional pagination, we would need to modify the search hook
                // For now, we'll use the load more functionality
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLoadMore={loadMore}
              hasMore={hasMore}
              loading={loading}
              showLoadMore={true}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default Opportunities;
