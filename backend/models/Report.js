const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference User model
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment', // Reference Appointment model
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test', // Reference Test model
      required: true,
    },
    reportFile: {
      type: String, // File path or cloud storage link (e.g., AWS S3)
      required: true,
    },
    status: {
      type: String,
      enum: ['In Process', 'Completed'],
      default: 'In Process',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
