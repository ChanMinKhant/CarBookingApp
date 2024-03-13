const router = require('express').Router();
const bookingController = require('../controller/bookingController');
const { verifyJWT } = require('./../middleware/verifyJWT');

router.get('/checkseat', bookingController.checkseat);
router.post('/create-book', bookingController.createBook);
router.route('/search').get(verifyJWT, bookingController.getSearchBookings);
router
  .route('/get-booking-data-for-form')
  .get(verifyJWT, bookingController.getBookingDataForForm);
router
  .route('/pendingseats')
  .get(verifyJWT, bookingController.getPendingsBooking);
router.route('/activities').get(verifyJWT, bookingController.getActivities);
router
  .route('/approvedseats')
  .get(verifyJWT, bookingController.getApprovedBooking);
router
  .route('/deletedseats')
  .get(verifyJWT, bookingController.getDeletedBooking);
router.route('/approve/:id').put(verifyJWT, bookingController.approveBooking);
router.route('/cancel/:id').put(verifyJWT, bookingController.cancelBooking);
router.route('/delete/:id').put(verifyJWT, bookingController.deleteBooking);
router.route('/addCarTime').post(verifyJWT, bookingController.addCarTime);
router.route('/removeCarTime').post(verifyJWT, bookingController.removeCarTime);
router.route('/getCount').post(bookingController.getCount);

module.exports = router;
