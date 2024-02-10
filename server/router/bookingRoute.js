const router = require('express').Router();
const bookingController = require('../controller/bookingController');
const { verifyJWT } = require('./../middleware/verifyJWT');
// router.post('/booking', bookingController.createBooking)
// router.get('/booking', bookingController.getBooking)
// router.get('/booking/:id', bookingController.getBookingById)
// router.put('/booking/:id', bookingController.updateBooking)
// router.delete('/booking/:id', bookingController.deleteBooking)
router.get('/checkseat', bookingController.checkseat);
router.post('/create-book', bookingController.createBook);
router.route('/get-all-bookings').get(verifyJWT, bookingController.getBookings);
router
  .route('/get-booking-data-for-form')
  .get(verifyJWT, bookingController.getBookingDataForForm);
router.route('/approve/:id').put(verifyJWT, bookingController.approveBooking);
router.route('/cancel/:id').put(verifyJWT, bookingController.cancelBooking);
router.route('/delete/:id').put(verifyJWT, bookingController.deleteBooking);
module.exports = router;
