const asyncErrorHandler = require('./../util/asyncErrorHandler');
const CustomError = require('./../util/CustomError');
const Admin = require('./../model/adminModel');
const Token = require('./../model/tokenModel');
const Booking = require('./../model/bookingModel');
const comparePassword = require('./../util');
const jwt = require('jsonwebtoken');

// create admin account
// "http://api-url/createAdmin"
exports.createAdmin = asyncErrorHandler(async (req, res, next) => {
  // to create admin account , admin must be logged in and have superAdmin role find from fb as req.adminId
  const adminId = req.account_id;
  const admin = await Admin.findById(adminId);
  if (admin.role !== 'superAdmin') {
    const err = new CustomError('You are not allowed to create admin', 401);
    return next(err);
  }
  const { username, password, email, role } = req.body;
  const createdAdmin = await Admin.create({
    username,
    password,
    email,
    role: role || 'admin',
  });
  res.status(201).json({
    success: true,
    createdAdmin,
  });
});

// check is admin?
// "http://api-url/isAdmin"
exports.isAdmin = asyncErrorHandler(async (req, res, next) => {
  const adminId = req.adminId;
  const admin = await Admin.findById(adminId);
  if (!admin) {
    const err = new CustomError('You are not admin', 401);
    return next(err);
  }
  res.status(200).json({
    success: true,
    isAdmin: true,
  });
});

// "http://api-url/login"
// send email to admin if another admin login
exports.login = asyncErrorHandler(async (req, res, next) => {
  console.log('login credentials: ', req.body);
  const { email, password } = req.body;
  // check if email and password exist
  if (!email || !password) {
    const err = new CustomError('Please provide email and password', 400);
    return next(err);
  }
  // find from db with email
  const adminFromDb = await Admin.findOne({ email });
  if (!adminFromDb) {
    const err = new CustomError('Incorrect email or password', 401);
    return next(err);
  }
  // check if password is correct
  const isPasswordCorrect = await adminFromDb.comparePassword(password);
  if (!isPasswordCorrect) {
    const err = new CustomError('Incorrect email or password', 401);
    return next(err);
  }
  const token = jwt.sign({ id: adminFromDb.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  // save token in db
  await Token.create({ token, adminId: adminFromDb.id });
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRES_IN || 20) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    token,
  });
});

// "http://api-url/logout"
exports.logout = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  await Token.findOneAndDelete({ token });
  res.clearCookie('jwt');
  res.status(200).json({
    success: true,
  });
});

// "http://api-url/logoutAll"
exports.logoutAll = asyncErrorHandler(async (req, res, next) => {
  const adminId = req.account_id;
  await Token.deleteMany({ adminId });
  res.clearCookie('jwt');
  res.status(200).json({
    success: true,
  });
});

exports.approveByEmail = asyncErrorHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const booking = await Booking.findById(id);
  if (!booking || booking.isArchived) {
    const err = new CustomError('No booking found', 404);
    return next(err);
  }
  const isTokenCorrect = await booking.compareToken(token);
  if (!isTokenCorrect) {
    const err = new CustomError('Invalid token', 400);
    return next(err);
  }
  booking.isApproved = true;
  await booking.save();
  res.status(200).json({
    success: true,
    message: 'Booking approved',
  });
});

exports.cancelByEmail = asyncErrorHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const booking = await Booking.findById(id);
  if (!booking || booking.isArchived) {
    const err = new CustomError('No booking found', 404);
    return next(err);
  }
  const isTokenCorrect = await booking.compareToken(token);
  if (!isTokenCorrect) {
    const err = new CustomError('Invalid token', 400);
    return next(err);
  }
  booking.isApproved = false;
  await booking.save();
  res.status(200).json({
    success: true,
    message: 'Booking cancelled',
  });
});

exports.deleteByEmail = asyncErrorHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const booking = await Booking.findById(id);
  if (!booking || booking.isArchived) {
    const err = new CustomError('No booking found', 404);
    return next(err);
  }
  const isTokenCorrect = await booking.compareToken(token);
  if (!isTokenCorrect) {
    const err = new CustomError('Invalid token', 400);
    return next(err);
  }
  await booking.delete();
  res.status(200).json({
    success: true,
    message: 'Booking deleted',
  });
});
