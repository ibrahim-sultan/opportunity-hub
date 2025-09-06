const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { auth } = require('../middleware/auth');

// Get user's applications
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('opportunity', 'title company location')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Create new application
router.post('/', auth, async (req, res) => {
  try {
    const newApplication = new Application({
      applicant: req.user.id,
      opportunity: req.body.opportunityId,
      coverLetter: req.body.coverLetter,
      status: 'pending'
    });

    const application = await newApplication.save();
    await application.populate('opportunity', 'title company location');
    
    res.json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Update application status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('opportunity', 'title company location');
    
    res.json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
