const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { auth } = require('../middleware/auth');

// Get user's certificates
router.get('/', auth, async (req, res) => {
  try {
    const certificates = await Certificate.find({ recipient: req.user.id })
      .populate('opportunity', 'title company')
      .sort({ createdAt: -1 });
    
    res.json(certificates);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Generate certificate
router.post('/generate', auth, async (req, res) => {
  try {
    const newCertificate = new Certificate({
      recipient: req.user.id,
      opportunity: req.body.opportunityId,
      certificateId: `CERT-${Date.now()}`,
      completionDate: new Date(),
      skillsGained: req.body.skills || []
    });

    const certificate = await newCertificate.save();
    await certificate.populate('opportunity', 'title company');
    
    res.json(certificate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Download certificate PDF
router.get('/:id/download', auth, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('recipient', 'firstName lastName')
      .populate('opportunity', 'title company');
    
    if (!certificate) {
      return res.status(404).json({ msg: 'Certificate not found' });
    }

    // Here you would generate PDF using PDFKit
    // For now, just return certificate data
    res.json(certificate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
