const mongoose = require('mongoose');

const addCarTimeSchema = new mongoose.Schema({
  travelDirection: {
    type: String,
    enum: ['Yangon → Pyay', 'Pyay → Yangon'],
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 3,
    min: [2, 'Minimum 2 cars are required.'],
    max: [6, 'Maximum 6 cars are allowed.'],
  },

  bookingDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AddCarTime = mongoose.model('AddCarTime', addCarTimeSchema);
module.exports = AddCarTime;
