const mongoose = require('mongoose');

const historySchema = mongoose.Schema(
  {
    // This creates a reference to a specific User document
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // The model to link to
    },
    sessionId: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ['chat', 'face-analysis'],
      default: 'chat'
    },
    messages: [{
      prompt: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
      analysis: {
        mainConcern: String,
        severity: String,
        relatedSymptoms: [String],
        cleanedResponse: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }
    }],
    // Keep the first prompt and response at the root level for compatibility
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    analysis: {
      sentiment: String,
      severity: String,
      topics: [String],
      suggestions: [String],
      mainConcern: String,
      relatedSymptoms: [String],
      cleanedResponse: String,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model('History', historySchema);

module.exports = History;