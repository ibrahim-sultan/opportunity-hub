const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // References
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Application Details
  coverLetter: {
    type: String,
    maxlength: 1000
  },
  resume: String, // File path
  
  // Responses to specific questions
  responses: [{
    question: String,
    answer: String
  }],
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  
  // Review
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  reviewNotes: String,
  
  // Completion
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  completionNotes: String,
  
  // Rating (by organization)
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String
  },
  
  // Communication
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ opportunity: 1, applicant: 1 }, { unique: true });

// Indexes for queries
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ opportunity: 1, status: 1 });
applicationSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);
