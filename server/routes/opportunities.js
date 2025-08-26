const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const { auth, authorize, requireVerification } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/opportunities
// @desc    Get all opportunities with filtering
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('type').optional().isIn(['internship', 'volunteer']).withMessage('Type must be internship or volunteer'),
  query('category').optional().isIn(['technology', 'health', 'education', 'agriculture', 'business', 'environment', 'arts', 'sports']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { status: 'active' };
    
    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.state) filter['location.state'] = req.query.state;
    if (req.query.lga) filter['location.lga'] = req.query.lga;
    if (req.query.remote === 'true') filter['location.isRemote'] = true;
    
    // Search functionality
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Date filters
    if (req.query.startDate) {
      filter.startDate = { $gte: new Date(req.query.startDate) };
    }

    const opportunities = await Opportunity.find(filter)
      .populate('organization', 'firstName lastName organizationName organizationType location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Opportunity.countDocuments(filter);

    res.json({
      opportunities,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get opportunities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/opportunities/:id
// @desc    Get single opportunity
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('organization', 'firstName lastName organizationName organizationType location website')
      .populate({
        path: 'applications',
        select: 'applicant status createdAt',
        populate: {
          path: 'applicant',
          select: 'firstName lastName'
        }
      });

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Increment view count
    opportunity.views += 1;
    await opportunity.save();

    res.json({ opportunity });
  } catch (error) {
    console.error('Get opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/opportunities
// @desc    Create new opportunity
// @access  Private (Organization only)
router.post('/', [
  auth,
  authorize('organization'),
  requireVerification,
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 50, max: 2000 }).withMessage('Description must be between 50 and 2000 characters'),
  body('type').isIn(['internship', 'volunteer']).withMessage('Type must be internship or volunteer'),
  body('category').isIn(['technology', 'health', 'education', 'agriculture', 'business', 'environment', 'arts', 'sports']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const opportunityData = {
      ...req.body,
      organization: req.user.id,
      status: 'pending' // Requires admin approval
    };

    const opportunity = new Opportunity(opportunityData);
    await opportunity.save();

    await opportunity.populate('organization', 'firstName lastName organizationName');

    res.status(201).json({
      message: 'Opportunity created successfully and sent for approval',
      opportunity
    });

  } catch (error) {
    console.error('Create opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/opportunities/:id
// @desc    Update opportunity
// @access  Private (Organization owner only)
router.put('/:id', [
  auth,
  authorize('organization'),
  requireVerification,
], async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check ownership
    if (opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this opportunity' });
    }

    // Update fields
    const allowedUpdates = ['title', 'description', 'requirements', 'location', 'duration', 'hoursPerWeek', 'startDate', 'endDate', 'applicationDeadline', 'maxApplicants', 'benefits'];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        opportunity[field] = req.body[field];
      }
    });

    // If significant changes, require re-approval
    if (req.body.title || req.body.description || req.body.type || req.body.category) {
      opportunity.status = 'pending';
      opportunity.approvedBy = undefined;
      opportunity.approvedAt = undefined;
    }

    await opportunity.save();
    await opportunity.populate('organization', 'firstName lastName organizationName');

    res.json({
      message: 'Opportunity updated successfully',
      opportunity
    });

  } catch (error) {
    console.error('Update opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/opportunities/:id
// @desc    Delete opportunity
// @access  Private (Organization owner only)
router.delete('/:id', [
  auth,
  authorize('organization'),
], async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check ownership
    if (opportunity.organization.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this opportunity' });
    }

    // Check if there are active applications
    const activeApplications = await Application.countDocuments({
      opportunity: req.params.id,
      status: { $in: ['pending', 'accepted'] }
    });

    if (activeApplications > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete opportunity with active applications' 
      });
    }

    await Opportunity.findByIdAndDelete(req.params.id);

    res.json({ message: 'Opportunity deleted successfully' });

  } catch (error) {
    console.error('Delete opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/opportunities/:id/save
// @desc    Save/unsave opportunity
// @access  Private (Youth only)
router.post('/:id/save', [
  auth,
  authorize('youth'),
], async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    const userId = req.user.id;
    const isSaved = opportunity.saves.includes(userId);

    if (isSaved) {
      // Unsave
      opportunity.saves = opportunity.saves.filter(id => id.toString() !== userId);
    } else {
      // Save
      opportunity.saves.push(userId);
    }

    await opportunity.save();

    res.json({
      message: isSaved ? 'Opportunity unsaved' : 'Opportunity saved',
      isSaved: !isSaved
    });

  } catch (error) {
    console.error('Save opportunity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/opportunities/my/posted
// @desc    Get opportunities posted by current organization
// @access  Private (Organization only)
router.get('/my/posted', [
  auth,
  authorize('organization'),
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const opportunities = await Opportunity.find({ organization: req.user.id })
      .populate('applications', 'applicant status createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Opportunity.countDocuments({ organization: req.user.id });

    res.json({
      opportunities,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get my opportunities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
