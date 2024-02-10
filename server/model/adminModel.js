// admain account here

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superAdmin'],
    default: 'admin',
  },
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//comparre password
adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
