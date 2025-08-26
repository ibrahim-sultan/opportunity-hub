const express = require('express');
const router = express.Router();
const searchService = require('../services/searchService');
const auth = require('../middleware/auth');

// GET /api/search/opportunities
router.get('/opportunities', async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      type: req.query.type,
      category: req.query.category,
      state: req.query.state,
      lga: req.query.lga,
      remote: req.query.remote === 'true',
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      minStipend: req.query.minStipend ? parseInt(req.query.minStipend) : undefined,
      maxStipend: req.query.maxStipend ? parseInt(req.query.maxStipend) : undefined,
      education: req.query.education,
      experience: req.query.experience,
      skills: req.query.skills ? req.query.skills.split(',') : [],
      sortBy: req.query.sortBy || 'newest',
      sortOrder: req.query.sortOrder || 'desc',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20
    };

    const results = await searchService.searchOpportunities(filters);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/search/suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = await searchService.getSearchSuggestions(req.query.q);
    res.json(suggestions);
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// POST /api/search/save
router.post('/save', auth, async (req, res) => {
  try {
    const { name, filters } = req.body;
    const savedSearch = await searchService.saveSearch(req.user.id, { name, filters });
    res.json(savedSearch);
  } catch (error) {
    console.error('Save search error:', error);
    res.status(500).json({ error: 'Failed to save search' });
  }
});

// GET /api/search/saved
router.get('/saved', auth, async (req, res) => {
  try {
    const savedSearches = await searchService.getSavedSearches(req.user.id);
    res.json(savedSearches);
  } catch (error) {
    console.error('Get saved searches error:', error);
    res.status(500).json({ error: 'Failed to get saved searches' });
  }
});

// DELETE /api/search/saved/:id
router.delete('/saved/:id', auth, async (req, res) => {
  try {
    const result = await searchService.deleteSavedSearch(req.user.id, req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Saved search not found' });
    }
    res.json({ message: 'Saved search deleted' });
  } catch (error) {
    console.error('Delete saved search error:', error);
    res.status(500).json({ error: 'Failed to delete saved search' });
  }
});

module.exports = router;
