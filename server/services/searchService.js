const Opportunity = require('../models/Opportunity');
const SavedSearch = require('../models/SavedSearch');
const mongoose = require('mongoose');

class SearchService {
  /**
   * Advanced search with multiple filters
   * @param {Object} filters - Search filters
   * @param {Object} options - Pagination and sorting
   * @returns {Object} Search results
   */
  async searchOpportunities(filters = {}, options = {}) {
    const {
      search,
      type,
      category,
      state,
      lga,
      remote,
      startDate,
      endDate,
      minStipend,
      maxStipend,
      education,
      experience,
      skills,
      sortBy = 'newest',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = filters;

    let query = { status: 'active' };

    // Text search
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'organization.name': { $regex: search, $options: 'i' } }
      ];
    }

    // Type filter
    if (type) query.type = type;
    if (category) query.category = category;

    // Location filters
    if (state) query['location.state'] = state;
    if (lga) query['location.lga'] = lga;
    if (remote !== undefined) query['location.isRemote'] = remote;

    // Date filters
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };

    // Stipend filters
    if (minStipend || maxStipend) {
      query['benefits.stipend.amount'] = {};
      if (minStipend) query['benefits.stipend.amount'].$gte = minStipend;
      if (maxStipend) query['benefits.stipend.amount'].$lte = maxStipend;
    }

    // Requirements filters
    if (education) query['requirements.education'] = education;
    if (experience) query['requirements.experience'] = experience;
    if (skills && skills.length > 0) {
      query['requirements.skills'] = { $in: skills };
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'newest':
        sort.createdAt = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'deadline':
        sort.applicationDeadline = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'stipend':
        sort['benefits.stipend.amount'] = sortOrder === 'desc' ? -1 : 1;
        break;
      case 'popularity':
        sort.views = sortOrder === 'desc' ? -1 : 1;
        break;
      default:
        sort.createdAt = -1;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const total = await Opportunity.countDocuments(query);
    const opportunities = await Opportunity.find(query)
      .populate('organization', 'name profileImage')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return {
      opportunities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get search suggestions
   * @param {string} query - Search query
   * @returns {Array} Suggestions
   */
  async getSearchSuggestions(query) {
    if (!query || query.length < 2) return [];

    const suggestions = await Opportunity.aggregate([
      {
        $match: {
          status: 'active',
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }
      },
      {
        $project: {
          title: 1,
          category: 1,
          type: 1,
          _id: 0
        }
      },
      { $limit: 10 }
    ]);

    return suggestions;
  }

  /**
   * Save search for user
   * @param {string} userId - User ID
   * @param {Object} searchData - Search configuration
   * @returns {Object} Saved search
   */
  async saveSearch(userId, searchData) {
    const savedSearch = new SavedSearch({
      user: userId,
      name: searchData.name,
      filters: searchData.filters
    });

    await savedSearch.save();
    return savedSearch;
  }

  /**
   * Get user's saved searches
   * @param {string} userId - User ID
   * @returns {Array} User's saved searches
   */
  async getSavedSearches(userId) {
    return await SavedSearch.find({ user: userId, isActive: true })
      .sort({ createdAt: -1 })
      .limit(20);
  }

  /**
   * Delete saved search
   * @param {string} userId - User ID
   * @param {string} searchId - Search ID
   * @returns {Object} Deletion result
   */
  async deleteSavedSearch(userId, searchId) {
    return await SavedSearch.findOneAndUpdate(
      { _id: searchId, user: userId },
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = new SearchService();
