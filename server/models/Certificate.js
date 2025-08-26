const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  // References
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  issuer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Certificate Details
  certificateId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  
  // Completion Details
  completionDate: {
    type: Date,
    required: true
  },
  duration: {
    value: Number,
    unit: String
  },
  hoursCompleted: Number,
  
  // Skills and Achievements
  skillsGained: [String],
  achievements: [String],
  
  // Verification
  verificationCode: {
    type: String,
    required: true,
    unique: true
  },
  
  // Files
  certificateFile: String, // PDF file path
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Testimonial
  testimonial: {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    authorTitle: String
  }
}, {
  timestamps: true
});

// Generate unique certificate ID
certificateSchema.pre('save', function(next) {
  if (!this.certificateId) {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    this.certificateId = `IVMP-${year}-${random}`;
  }
  
  if (!this.verificationCode) {
    this.verificationCode = Math.random().toString(36).substr(2, 12).toUpperCase();
  }
  
  next();
});

// Indexes
certificateSchema.index({ recipient: 1 });
certificateSchema.index({ certificateId: 1 });
certificateSchema.index({ verificationCode: 1 });

module.exports = mongoose.model('Certificate', certificateSchema);
