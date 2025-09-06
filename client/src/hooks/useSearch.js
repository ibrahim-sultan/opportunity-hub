import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const useSearch = () => {
  const { user } = useAuth();
  const [searchState, setSearchState] = useState({
    query: '',
    filters: {
      type: '',
      category: '',
      state: '',
      lga: '',
      remote: false,
      startDate: '',
      endDate: '',
      minStipend: '',
      maxStipend: '',
      education: '',
      experience: '',
      skills: []
    },
    sortBy: 'newest',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });

  const [results, setResults] = useState({
    opportunities: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0
    }
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);

  const debounceRef = useRef(null);
  const suggestionsDebounceRef = useRef(null);

  // Search opportunities
  const searchOpportunities = useCallback(async (searchParams = searchState, resetPage = false) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      // Add search query
      if (searchParams.query) params.append('search', searchParams.query);
      
      // Add filters
      Object.entries(searchParams.filters).forEach(([key, value]) => {
        if (value && value !== '' && value !== false) {
          if (Array.isArray(value) && value.length > 0) {
            params.append(key, value.join(','));
          } else if (!Array.isArray(value)) {
            params.append(key, value.toString());
          }
        }
      });

      // Add sorting and pagination
      params.append('sortBy', searchParams.sortBy);
      params.append('sortOrder', searchParams.sortOrder);
      params.append('page', resetPage ? '1' : searchParams.page.toString());
      params.append('limit', searchParams.limit.toString());

      // Try search API first, fallback to opportunities API
      let response;
      try {
        response = await axios.get(`/api/search/opportunities?${params.toString()}`);
      } catch (searchError) {
        console.warn('Search API failed, trying opportunities API:', searchError);
        response = await axios.get(`/api/opportunities?${params.toString()}`);
      }
      
      // Ensure response has expected structure
      const data = response.data || {};
      const opportunities = data.opportunities || [];
      const pagination = data.pagination || {
        page: 1,
        limit: 20,
        total: opportunities.length,
        pages: 1
      };
      
      const formattedResponse = {
        opportunities,
        pagination
      };
      
      if (resetPage || searchParams.page === 1) {
        setResults(formattedResponse);
      } else {
        // Append results for pagination
        setResults(prev => ({
          ...formattedResponse,
          opportunities: [...prev.opportunities, ...opportunities]
        }));
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to load opportunities. Please try again.');
      
      // Set fallback data instead of leaving empty
      setResults({
        opportunities: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      });
    } finally {
      setLoading(false);
    }
  }, [searchState]);

  // Get search suggestions
  const getSearchSuggestions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setSuggestionsLoading(true);
    try {
      const response = await axios.get(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      setSuggestions(response.data);
    } catch (err) {
      console.error('Suggestions error:', err);
      setSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  }, []);

  // Debounced search
  const debouncedSearch = useCallback((searchParams, resetPage = true) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchOpportunities(searchParams, resetPage);
    }, 300);
  }, [searchOpportunities]);

  // Debounced suggestions
  const debouncedSuggestions = useCallback((query) => {
    if (suggestionsDebounceRef.current) {
      clearTimeout(suggestionsDebounceRef.current);
    }
    suggestionsDebounceRef.current = setTimeout(() => {
      getSearchSuggestions(query);
    }, 200);
  }, [getSearchSuggestions]);

  // Update search query
  const updateQuery = useCallback((query) => {
    const newState = { ...searchState, query, page: 1 };
    setSearchState(newState);
    debouncedSearch(newState);
    debouncedSuggestions(query);
  }, [searchState, debouncedSearch, debouncedSuggestions]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = { ...searchState.filters, ...newFilters };
    const newState = { ...searchState, filters: updatedFilters, page: 1 };
    setSearchState(newState);
    debouncedSearch(newState);
  }, [searchState, debouncedSearch]);

  // Update sorting
  const updateSorting = useCallback((sortBy, sortOrder = 'desc') => {
    const newState = { ...searchState, sortBy, sortOrder, page: 1 };
    setSearchState(newState);
    debouncedSearch(newState);
  }, [searchState, debouncedSearch]);

  // Load more results (pagination)
  const loadMore = useCallback(() => {
    if (loading || results.pagination.page >= results.pagination.pages) return;
    
    const newState = { ...searchState, page: searchState.page + 1 };
    setSearchState(newState);
    searchOpportunities(newState, false);
  }, [loading, results.pagination, searchState, searchOpportunities]);

  // Reset search
  const resetSearch = useCallback(() => {
    const initialState = {
      query: '',
      filters: {
        type: '',
        category: '',
        state: '',
        lga: '',
        remote: false,
        startDate: '',
        endDate: '',
        minStipend: '',
        maxStipend: '',
        education: '',
        experience: '',
        skills: []
      },
      sortBy: 'newest',
      sortOrder: 'desc',
      page: 1,
      limit: 20
    };
    setSearchState(initialState);
    setSuggestions([]);
    searchOpportunities(initialState, true);
  }, [searchOpportunities]);

  // Save search
  const saveSearch = useCallback(async (name) => {
    if (!user) return;

    try {
      const searchData = {
        name,
        filters: {
          search: searchState.query,
          ...searchState.filters,
          sortBy: searchState.sortBy,
          sortOrder: searchState.sortOrder
        }
      };

      const response = await axios.post('/api/search/save', searchData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setSavedSearches(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to save search');
    }
  }, [user, searchState]);

  // Load saved searches
  const loadSavedSearches = useCallback(async () => {
    if (!user) return;

    try {
      const response = await axios.get('/api/search/saved', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSavedSearches(response.data);
    } catch (err) {
      console.error('Failed to load saved searches:', err);
    }
  }, [user]);

  // Apply saved search
  const applySavedSearch = useCallback((savedSearch) => {
    const { search, sortBy, sortOrder, ...filters } = savedSearch.filters;
    const newState = {
      query: search || '',
      filters: {
        ...searchState.filters,
        ...filters
      },
      sortBy: sortBy || 'newest',
      sortOrder: sortOrder || 'desc',
      page: 1,
      limit: 20
    };
    setSearchState(newState);
    setSuggestions([]);
    searchOpportunities(newState, true);
  }, [searchState.filters, searchOpportunities]);

  // Delete saved search
  const deleteSavedSearch = useCallback(async (searchId) => {
    if (!user) return;

    try {
      await axios.delete(`/api/search/saved/${searchId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSavedSearches(prev => prev.filter(search => search._id !== searchId));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete search');
    }
  }, [user]);

  // Initial search on mount
  useEffect(() => {
    searchOpportunities(searchState, true);
    if (user) {
      loadSavedSearches();
    }
  }, [user]); // Only depend on user to avoid infinite loops

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (suggestionsDebounceRef.current) clearTimeout(suggestionsDebounceRef.current);
    };
  }, []);

  return {
    // State
    searchState,
    results,
    suggestions,
    savedSearches,
    loading,
    suggestionsLoading,
    error,
    
    // Actions
    updateQuery,
    updateFilters,
    updateSorting,
    loadMore,
    resetSearch,
    saveSearch,
    applySavedSearch,
    deleteSavedSearch,
    
    // Computed values
    hasMore: results.pagination.page < results.pagination.pages,
    totalResults: results.pagination.total
  };
};

export default useSearch;
