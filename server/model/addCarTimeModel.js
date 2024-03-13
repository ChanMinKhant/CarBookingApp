const mongoose = require('mongoose');
const { carTimes } = require('../util/enum');

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
    min: [0, 'Minimum 0 cars are required.'],
    max: [carTimes.length, 'Maximum 6 cars are allowed.'],
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
