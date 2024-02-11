const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: [true, 'Seat number is required.'],
    },
    travelDirection: {
      type: String,
      enum: ['Yangon → Pyay', 'Pyay → Yangon'],
      required: true,
    },
    carTime: {
      type: String,
      enum: ['6:00', '6:05', '6:10', '6:15'],
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'deleted'],
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
