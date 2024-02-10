const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Admin',
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
