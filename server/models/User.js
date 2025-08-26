const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // User Role
  role: {
    type: String,
    enum: ['youth', 'organization', 'admin'],
    required: true
  },
  
  // Contact Info
  phone: {
    type: String,
    trim: true
  },
  location: {
    state: String,
    lga: String,
    town: String,
    address: String
  },
  
  // Youth-specific fields
  dateOfBirth: Date,
  education: {
    level: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'none']
    },
    institution: String,
    course: String,
    graduationYear: Number
  },
  interests: [{
    type: String,
    enum: ['technology', 'health', 'education', 'agriculture', 'business', 'environment', 'arts', 'sports']
  }],
  skills: [String],
  bio: {
    type: String,
    maxlength: 500
  },
  
  // Organization-specific fields
  organizationName: String,
  organizationType: {
    type: String,
    enum: ['ngo', 'startup', 'government', 'corporate', 'community']
  },
  organizationDescription: {
    type: String,
    maxlength: 1000
  },
  website: String,
  
  // Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpires: Date,
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  
  // Profile
  profilePicture: String,
  resume: String,
  
  // Achievements
  completedOpportunities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity'
  }],
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  
  // Ratings
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for search
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'location.state': 1, 'location.lga': 1 });
userSchema.index({ interests: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Transform JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  return user;
};

module.exports = mongoose.model('User', userSchema);
