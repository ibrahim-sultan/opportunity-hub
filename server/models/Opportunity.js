const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  
  // Organization
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Type and Category
  type: {
    type: String,
    enum: ['internship', 'volunteer'],
    required: true
  },
  category: {
    type: String,
    enum: ['technology', 'health', 'education', 'agriculture', 'business', 'environment', 'arts', 'sports'],
    required: true
  },
  
  // Requirements
  requirements: {
    education: {
      type: String,
      enum: ['none', 'primary', 'secondary', 'tertiary', 'any']
    },
    skills: [String],
    experience: {
      type: String,
      enum: ['none', 'beginner', 'intermediate', 'advanced']
    },
    ageRange: {
      min: Number,
      max: Number
    }
  },
  
  // Location and Format
  location: {
    state: String,
    lga: String,
    town: String,
    address: String,
    isRemote: {
      type: Boolean,
      default: false
    }
  },
  
  // Duration and Commitment
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months']
    }
  },
  hoursPerWeek: Number,
  startDate: Date,
  endDate: Date,
  
  // Application
  applicationDeadline: Date,
  maxApplicants: {
    type: Number,
    default: 10
  },
  currentApplicants: {
    type: Number,
    default: 0
  },
  
  // Benefits
  benefits: {
    stipend: {
      amount: Number,
      currency: {
        type: String,
        default: 'NGN'
      }
    },
    certificate: {
      type: Boolean,
      default: true
    },
    recommendation: {
      type: Boolean,
      default: false
    },
    training: {
      type: Boolean,
      default: false
    },
    mentorship: {
      type: Boolean,
      default: false
    }
  },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'pending', 'active', 'closed', 'cancelled'],
    default: 'draft'
  },
  
  // Applications
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  
  // Engagement
  views: {
    type: Number,
    default: 0
  },
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Admin
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String
}, {
  timestamps: true
});

// Indexes for search and filtering
opportunitySchema.index({ status: 1, category: 1 });
opportunitySchema.index({ 'location.state': 1, 'location.lga': 1 });
opportunitySchema.index({ type: 1, status: 1 });
opportunitySchema.index({ applicationDeadline: 1 });
opportunitySchema.index({ title: 'text', description: 'text' });

// Virtual for application count
opportunitySchema.virtual('applicationCount').get(function() {
  return this.applications.length;
});

// Check if opportunity is still open for applications
opportunitySchema.virtual('isOpen').get(function() {
  const now = new Date();
  return this.status === 'active' && 
         this.applicationDeadline > now && 
         this.currentApplicants < this.maxApplicants;
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
