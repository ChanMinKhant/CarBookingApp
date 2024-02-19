const router = require('express').Router();
const bookingController = require('../controller/bookingController');
const { verifyJWT } = require('./../middleware/verifyJWT');

router.get('/checkseat', bookingController.checkseat);
router.post('/create-book', bookingController.createBook);
router.route('/get-all-bookings').get(verifyJWT, bookingController.getBookings);
router
  .route('/get-booking-data-for-form')
  .get(verifyJWT, bookingController.getBookingDataForForm);
router.route('/approve/:id').put(verifyJWT, bookingController.approveBooking);
router.route('/cancel/:id').put(verifyJWT, bookingController.cancelBooking);
router.route('/delete/:id').put(verifyJWT, bookingController.deleteBooking);
router.route('/addCarTime').post(verifyJWT, bookingController.addCarTime);
router.route('/removeCarTime').post(verifyJWT, bookingController.removeCarTime);
router.route('/getCount').get(bookingController.getCount);

module.exports = router;
