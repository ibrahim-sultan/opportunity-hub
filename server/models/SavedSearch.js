const mongoose = require('mongoose');

const savedSearchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  filters: {
    search: String,
    type: String,
    category: String,
    state: String,
    lga: String,
    remote: Boolean,
    startDate: Date,
    endDate: Date,
    minStipend: Number,
    maxStipend: Number,
    education: String,
    experience: String,
    skills: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
savedSearchSchema.index({ user: 1, isActive: 1 });
savedSearchSchema.index({ lastUsed: -1 });

module.exports = mongoose.model('SavedSearch', savedSearchSchema);
