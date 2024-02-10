const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Username is required.'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required.'],
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required.'],
  },
  deliveryLocation: {
    type: String,
    required: [true, 'Delivery location is required.'],
  },
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
  message: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  tokenHash: {
    type: String,
    required: true,
  },
});

// bookingSchema.pre('save', async function (next) {
//   // Generate random token
//   const token = Math.random().toString(36).substring(7);
//   // /Hash token using bcrypt/;
//   const hashedToken = await bcrypt.hash(token, 10); // You can adjust the salt rounds as needed
//   console.log('Token:', token);
//   this.tokenHash = hashedToken;
//   next();
// });

bookingSchema.methods.compareToken = async function (token) {
  return await bcrypt.compare(token, this.tokenHash);
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
