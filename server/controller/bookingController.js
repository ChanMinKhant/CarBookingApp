const asyncErrorHandler = require('./../util/asyncErrorHandler');
const Booking = require('./../model/bookingModel');
const bcrypt = require('bcryptjs');
const CustomError = require('./../util/CustomError');
const { sendEmail, EmailTemplate } = require('./../util/index');

//"http://api-url/checkseat/?date=20-01-2004&time=7:00?from=yangon" or "from=pyay"
// i need to check the date and time is not in 7:00, 9:00, 11:00, 13:00, 15:00, 17:00, 19:00 , valid or not
// i need to add pending status to booking
exports.checkseat = asyncErrorHandler(async (req, res, next) => {
  const { date, time, from } = req.query;

  if (!date || !time || !from) {
    return next(new CustomError('Please provide date, time, and from', 400));
  }

  let query = { bookingDate: date, carTime: time };
  if (from === 'yangon') {
    query = { ...query, travelDirection: 'Yangon → Pyay' };
  } else if (from === 'pyay') {
    query = { ...query, travelDirection: 'Pyay → Yangon' };
  } else {
    return next(new CustomError('Please provide a valid from', 400));
  }

  const Bookings = await Booking.find({ ...query, isArchived: false });

  const pendingSeats = Bookings.filter((booking) => !booking.isApproved).map(
    (booking) => booking.seatNumber
  );
  const approvedSeats = Bookings.filter((booking) => booking.isApproved).map(
    (booking) => booking.seatNumber
  );
  const availableSeats = [1, 2, 3, 4].filter((seat) => {
    return !Bookings.some(
      (booking) => booking.seatNumber === seat && booking.isApproved
    );
  });

  res.status(200).json({
    success: true,
    availableSeats,
    pendingSeats,
    approvedSeats,
  });
});

//"http://api-url/book"
exports.createBook = asyncErrorHandler(async (req, res, next) => {
  const {
    userName, // form state
    phoneNumber, // form state
    pickupLocation, // form state
    deliveryLocation, // form state
    seatNumber, // interface state
    travelDirection, // props
    carTime, // undefined
    bookingDate, // choseDate state
    message, // form state
  } = req.body;
  //check required fields

  // need to add isAdmin
  const isExist = await Booking.findOne({
    seatNumber,
    bookingDate,
    carTime,
    isArchived: false,
  });
  if (isExist) {
    return next(new CustomError('Seat is already booked', 400));
  }

  if (!userName) {
    return next(new CustomError('Please provide your name', 400));
  }
  if (!phoneNumber) {
    return next(new CustomError('Please provide your phone number', 400));
  }

  if (!travelDirection) {
    return next(new CustomError('Please provide your travel direction', 400));
  }
  //check valid fields
  const availableDirections = ['Yangon → Pyay', 'Pyay → Yangon'];
  if (!availableDirections.includes(travelDirection)) {
    return next(
      new CustomError('Please provide a valid travel direction', 400)
    );
  }

  if (!bookingDate) {
    return next(new CustomError('Please provide your date', 400));
  }
  // if date is less than today , u cant book it
  // change date format
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0] + 'T00:00:00.000Z'; // backup plan
  const dateParts = bookingDate.split('/');
  const requestedDate = new Date(
    `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  );
  if (!requestedDate.getTime()) {
    return next(new CustomError('Please provide a valid date.', 400));
  }
  if (requestedDate < formattedToday) {
    //setHours(0, 0, 0, 0) is to set time to 00:00:00:00
    return next(new CustomError('Please provide a valid date', 400));
  }
  if (!carTime) {
    return next(new CustomError('Please provide your time', 400));
  }
  //if time is not in 6:00, 6:05, 6:10, 6:15, u cant book it
  const availableTimes = ['6:00', '6:05', '6:10', '6:15'];
  if (!availableTimes.includes(carTime)) {
    return next(new CustomError('Please provide a valid time', 400));
  }
  if (!seatNumber) {
    return next(new CustomError('Please provide your seat', 400));
  }

  const token = Math.random().toString(36).substring(7);
  const hashedToken = await bcrypt.hash(token, 10);

  const data = {
    userName,
    phoneNumber,
    pickupLocation,
    deliveryLocation,
    seatNumber,
    travelDirection,
    carTime,
    bookingDate,
    message,
    tokenHash: hashedToken,
  };
  //save to database
  const booking = await Booking.create(data);
  //sentEmail to admin to approve
  const approveToken = `${process.env.CLIENT_URL}/admin/approve/${booking._id}/${token}`;
  const deleteToken = `${process.env.CLIENT_URL}/admin/delete/${booking._id}/${token}`;
  const cancelToken = `${process.env.CLIENT_URL}/admin/cancel/${booking._id}/${token}`;
  const emailTemplate = EmailTemplate(
    booking,
    deleteToken,
    cancelToken,
    approveToken
  );

  sendEmail({
    email: 'cmktempmail2264@gmail.com',
    subject: 'New Booking',
    message: emailTemplate,
  });

  res.status(201).json({
    success: true,
    booking,
  });
});

// "http://api-url"
exports.getBookings = asyncErrorHandler(async (req, res, next) => {
  const requestedDate = new Date(req.query.date);
  const requestedTime = req.query.time;
  let query = {
    bookingDate: requestedDate,
  };
  if (requestedTime) {
    query.carTime = requestedTime;
  }
  const existingBookings = await Booking.find(query);
  res.status(200).json({
    success: true,
    existingBookings,
  });
});

exports.getBookingDataForForm = asyncErrorHandler(async (req, res, next) => {
  const { date, time, from, seatNumber } = req.query;
  if (!date || !time || !from || !seatNumber) {
    return next(
      new CustomError('Please provide date, time, from and seatNumber', 400)
    );
  }
  let query = {
    bookingDate: date,
    carTime: time,
    seatNumber: seatNumber,
    travelDirection: from,
    isArchived: false,
  };
  if (from === 'yangon') {
    query = { ...query, travelDirection: 'Yangon → Pyay' };
  } else if (from === 'pyay') {
    query = { ...query, travelDirection: 'Pyay → Yangon' };
  } else {
    return next(new CustomError('Please provide a valid from', 400));
  }
  const existingBooking = await Booking.find(query);
  if (existingBooking.length === 0) {
    // i make this for the frontend to check if the seat is available or not
    return next(new CustomError('Booking not found', 404));
  }
  res.status(200).json({
    success: true,
    data: existingBooking,
  });
});

// "http://api-url/:id"
exports.approveBooking = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  //search booking by id and update isApproved field to true and return updated booking
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true }
  );
  if (!updatedBooking) {
    throw new CustomError('Booking not found', 404);
  }
  return res
    .status(200)
    .json({ success: true, message: 'Booking approved', updatedBooking });
});

// "http://api-url/:id"
exports.cancelBooking = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  // search booking by id and update isArchived field to true
  const book = await Booking.findById(id);
  if (!book || book.isArchived) {
    throw new CustomError('Booking not found', 404);
  }
  book.isApproved = false;
  await book.save();

  return res.status(200).json({ success: true, message: 'Booking cancelled' });
});

exports.deleteBooking = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedBooking = await Booking.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );
  return res
    .status(200)
    .json({ success: true, message: 'Booking deleted', deletedBooking });
});
