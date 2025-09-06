import React from 'react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalResults, 
  resultsPerPage, 
  onPageChange, 
  onLoadMore, 
  hasMore, 
  loading,
  showLoadMore = true 
}) => {
  const startResult = ((currentPage - 1) * resultsPerPage) + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalResults === 0) {
    return null;
  }

  return (
    <div className="pagination-container">
      {/* Results Info */}
      <div className="results-info">
        <span>
          Showing {startResult}-{endResult} of {totalResults.toLocaleString()} results
        </span>
      </div>

      {/* Load More Button (for infinite scroll style) */}
      {showLoadMore && hasMore && (
        <div className="load-more-section">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className={`load-more-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Loading more...
              </>
            ) : (
              <>
                Load More Results
                <span className="load-more-icon">↓</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Traditional Pagination */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn prev-btn"
            aria-label="Previous page"
          >
            <span className="pagination-icon">←</span>
            Previous
          </button>

          {/* Page Numbers */}
          <div className="page-numbers">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="pagination-ellipsis">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn next-btn"
            aria-label="Next page"
          >
            Next
            <span className="pagination-icon">→</span>
          </button>
        </div>
      )}

      {/* Page Jump */}
      {totalPages > 10 && (
        <div className="page-jump">
          <label htmlFor="page-jump-input">Go to page:</label>
          <input
            id="page-jump-input"
            type="number"
            min="1"
            max={totalPages}
            placeholder={currentPage}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages && page !== currentPage) {
                  onPageChange(page);
                  e.target.value = '';
                }
              }
            }}
            className="page-jump-input"
          />
          <span className="page-jump-total">of {totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
