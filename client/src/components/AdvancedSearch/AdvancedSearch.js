import React, { useState } from 'react';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import './AdvancedSearch.css';

const AdvancedSearch = ({
  searchState,
  suggestions,
  suggestionsLoading,
  onQueryChange,
  onFiltersChange,
  onSortChange,
  onReset,
  onSaveSearch
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleQueryChange = (e) => {
    const value = e.target.value;
    onQueryChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onQueryChange(suggestion);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterName, value) => {
    onFiltersChange({ [filterName]: value });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    handleFilterChange('skills', skills);
  };

  const handleSaveSearch = () => {
    if (saveSearchName.trim()) {
      onSaveSearch(saveSearchName.trim());
      setSaveSearchName('');
      setShowSaveDialog(false);
    }
  };

  const clearFilter = (filterName) => {
    if (filterName === 'skills') {
      handleFilterChange(filterName, []);
    } else {
      handleFilterChange(filterName, '');
    }
  };

  const getActiveFiltersCount = () => {
    const { filters } = searchState;
    let count = 0;
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'skills' && Array.isArray(value) && value.length > 0) count++;
      else if (key === 'remote' && value === true) count++;
      else if (value && value !== '' && value !== false) count++;
    });
    
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="advanced-search">
      {/* Main Search Bar */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search opportunities by title, description, or organization..."
            value={searchState.query}
            onChange={handleQueryChange}
            onFocus={() => setShowSuggestions(searchState.query.length > 0)}
            className="search-input"
          />
          <div className="search-input-actions">
            {searchState.query && (
              <button
                type="button"
                onClick={() => {
                  onQueryChange('');
                  setShowSuggestions(false);
                }}
                className="clear-search-btn"
              >
                ✕
              </button>
            )}
            <span className="search-icon">🔍</span>
          </div>
          
          <SearchSuggestions
            suggestions={suggestions}
            loading={suggestionsLoading}
            onSuggestionClick={handleSuggestionClick}
            onClose={() => setShowSuggestions(false)}
            visible={showSuggestions}
          />
        </div>

        {/* Search Actions */}
        <div className="search-actions">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`advanced-toggle ${showAdvanced ? 'active' : ''}`}
          >
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="filter-count">{activeFiltersCount}</span>
            )}
            <span className={`toggle-icon ${showAdvanced ? 'rotated' : ''}`}>▼</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowSaveDialog(true)}
            className="save-search-btn"
            disabled={!searchState.query && activeFiltersCount === 0}
          >
            💾 Save
          </button>
          
          <button
            type="button"
            onClick={onReset}
            className="reset-btn"
            disabled={!searchState.query && activeFiltersCount === 0}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filters-grid">
            {/* Basic Filters */}
            <div className="filter-group">
              <label>Type</label>
              <select
                value={searchState.filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="internship">Internship</option>
                <option value="volunteer">Volunteer</option>
                <option value="training">Training</option>
                <option value="mentorship">Mentorship</option>
              </select>
              {searchState.filters.type && (
                <button onClick={() => clearFilter('type')} className="clear-filter">✕</button>
              )}
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select
                value={searchState.filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="technology">Technology</option>
                <option value="agriculture">Agriculture</option>
                <option value="business">Business</option>
                <option value="community">Community Service</option>
                <option value="engineering">Engineering</option>
                <option value="research">Research</option>
              </select>
              {searchState.filters.category && (
                <button onClick={() => clearFilter('category')} className="clear-filter">✕</button>
              )}
            </div>

            {/* Location Filters */}
            <div className="filter-group">
              <label>State</label>
              <select
                value={searchState.filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              >
                <option value="">All States</option>
                <option value="kwara">Kwara</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="oyo">Oyo</option>
                <option value="kano">Kano</option>
              </select>
              {searchState.filters.state && (
                <button onClick={() => clearFilter('state')} className="clear-filter">✕</button>
              )}
            </div>

            <div className="filter-group">
              <label>LGA</label>
              <select
                value={searchState.filters.lga}
                onChange={(e) => handleFilterChange('lga', e.target.value)}
              >
                <option value="">All LGAs</option>
                <option value="ifelodun">Ifelodun</option>
                <option value="ilorin-south">Ilorin South</option>
                <option value="ilorin-west">Ilorin West</option>
                <option value="offa">Offa</option>
              </select>
              {searchState.filters.lga && (
                <button onClick={() => clearFilter('lga')} className="clear-filter">✕</button>
              )}
            </div>

            {/* Date Filters */}
            <div className="filter-group">
              <label>Start Date (From)</label>
              <input
                type="date"
                value={searchState.filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
              {searchState.filters.startDate && (
                <button onClick={() => clearFilter('startDate')} className="clear-filter">✕</button>
              )}
            </div>

            <div className="filter-group">
              <label>End Date (To)</label>
              <input
                type="date"
                value={searchState.filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
              {searchState.filters.endDate && (
                <button onClick={() => clearFilter('endDate')} className="clear-filter">✕</button>
              )}
            </div>

            {/* Stipend Filters */}
            <div className="filter-group">
              <label>Min Stipend (₦)</label>
              <input
                type="number"
                placeholder="0"
                value={searchState.filters.minStipend}
                onChange={(e) => handleFilterChange('minStipend', e.target.value)}
              />
              {searchState.filters.minStipend && (
                <button onClick={() => clearFilter('minStipend')} className="clear-filter">✕</button>
              )}
            </div>

            <div className="filter-group">
              <label>Max Stipend (₦)</label>
              <input
                type="number"
                placeholder="1000000"
                value={searchState.filters.maxStipend}
                onChange={(e) => handleFilterChange('maxStipend', e.target.value)}
              />
              {searchState.filters.maxStipend && (
                <button onClick={() => clearFilter('maxStipend')} className="clear-filter">✕</button>
              )}
            </div>

            {/* Requirements Filters */}
            <div className="filter-group">
              <label>Education Level</label>
              <select
                value={searchState.filters.education}
                onChange={(e) => handleFilterChange('education', e.target.value)}
              >
                <option value="">Any Level</option>
                <option value="secondary">Secondary School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
              {searchState.filters.education && (
                <button onClick={() => clearFilter('education')} className="clear-filter">✕</button>
              )}
            </div>

            <div className="filter-group">
              <label>Experience Level</label>
              <select
                value={searchState.filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="">Any Experience</option>
                <option value="entry">Entry Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="senior">Senior Level</option>
              </select>
              {searchState.filters.experience && (
                <button onClick={() => clearFilter('experience')} className="clear-filter">✕</button>
              )}
            </div>

            {/* Skills Filter */}
            <div className="filter-group full-width">
              <label>Skills (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. JavaScript, Python, Communication"
                value={searchState.filters.skills.join(', ')}
                onChange={handleSkillsChange}
              />
              {searchState.filters.skills.length > 0 && (
                <button onClick={() => clearFilter('skills')} className="clear-filter">✕</button>
              )}
            </div>

            {/* Remote Work Toggle */}
            <div className="filter-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={searchState.filters.remote}
                  onChange={(e) => handleFilterChange('remote', e.target.checked)}
                />
                <span className="checkmark"></span>
                Remote Work Only
              </label>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="sorting-section">
            <h4>Sort By</h4>
            <div className="sort-options">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'deadline', label: 'Application Deadline' },
                { value: 'stipend', label: 'Stipend Amount' },
                { value: 'popularity', label: 'Most Popular' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value, searchState.sortOrder)}
                  className={`sort-option ${searchState.sortBy === option.value ? 'active' : ''}`}
                >
                  {option.label}
                  {searchState.sortBy === option.value && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSortChange(option.value, searchState.sortOrder === 'desc' ? 'asc' : 'desc');
                      }}
                      className="sort-direction"
                    >
                      {searchState.sortOrder === 'desc' ? '↓' : '↑'}
                    </button>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Search Dialog */}
      {showSaveDialog && (
        <div className="save-dialog-overlay">
          <div className="save-dialog">
            <h3>Save Search</h3>
            <input
              type="text"
              placeholder="Enter search name..."
              value={saveSearchName}
              onChange={(e) => setSaveSearchName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveSearch()}
              autoFocus
            />
            <div className="save-dialog-actions">
              <button onClick={() => setShowSaveDialog(false)} className="cancel-btn">
                Cancel
              </button>
              <button 
                onClick={handleSaveSearch} 
                className="save-btn"
                disabled={!saveSearchName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
