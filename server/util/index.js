const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.compareHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.sendEmail = async (option) => {
  if (!option.email) {
    throw new Error('Please provide email');
  }
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'website Name'}" <${
      process.env.EMAIL_FROM
    }>`, // sender address
    to: option.email,
    subject: option.subject,
    html: option.message,
  };
  await transporter.sendMail(mailOptions);
};

exports.EmailTemplate = (book, deleteToken, cancelToken, approveToken) => {
  return `
  <style>
    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #666;
      font-size: 16px;
      margin-bottom: 10px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin-bottom: 5px;
    }
    a {
      color: #007bff;
      text-decoration: none;
      margin-right: 10px;
    }
  </style>
  <h1>New Booking Order</h1>
  <p>Hello Admin,</p>
  <p>A new booking order has been received. Here are the details:</p>
  <ul>
    <li>User Name: ${book.userName}</li>
    <li>Phone Number: ${book.phoneNumber}</li>
    <li>Travel Direction: ${book.travelDirection}</li>
    <li>Car Time: ${book.carTime}</li>
    <li>Booking Date: ${book.bookingDate}</li>
    <li>Seat Number: ${
      book.seatNumber !== null ? book.seatNumber : 'Not specified'
    }</li>
    <li>Pickup Location: ${book.pickupLocation}</li>
    <li>Delivery Location: ${book.deliveryLocation}</li>
    <li>Message: ${book.message}</li>
  </ul>
  <p>To approve this booking, please click the following link:</p>
  <a href="${approveToken}">Approve Booking</a>
  <p>If you wish to delete this booking, please click the following link:</p>
  <a href="${deleteToken}">Delete Booking</a>
  <p>If you wish to cancel this booking, please click the following link:</p>
  <a href="${cancelToken}">Cancel Booking</a>
  <p>Thank you!</p>
`;
};
