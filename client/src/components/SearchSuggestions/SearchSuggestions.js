import React from 'react';
import './SearchSuggestions.css';

const SearchSuggestions = ({ 
  suggestions, 
  loading, 
  onSuggestionClick, 
  onClose,
  visible 
}) => {
  if (!visible || (!loading && suggestions.length === 0)) {
    return null;
  }

  return (
    <div className="search-suggestions">
      <div className="suggestions-backdrop" onClick={onClose} />
      <div className="suggestions-dropdown">
        {loading ? (
          <div className="suggestion-item loading">
            <div className="suggestion-spinner"></div>
            <span>Searching...</span>
          </div>
        ) : (
          <>
            {suggestions.length > 0 ? (
              <>
                <div className="suggestions-header">
                  <span>Suggestions</span>
                </div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => onSuggestionClick(suggestion.title)}
                  >
                    <div className="suggestion-icon">🔍</div>
                    <div className="suggestion-content">
                      <div className="suggestion-title">{suggestion.title}</div>
                      <div className="suggestion-meta">
                        <span className="suggestion-type">{suggestion.type}</span>
                        {suggestion.category && (
                          <>
                            <span className="suggestion-separator">•</span>
                            <span className="suggestion-category">{suggestion.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="suggestion-item no-results">
                <div className="suggestion-icon">❌</div>
                <span>No suggestions found</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchSuggestions;
