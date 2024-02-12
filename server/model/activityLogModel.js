const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'cancelled', 'deleted', 'pending'],
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
