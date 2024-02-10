const router = require('express').Router();

const admin = require('./adminRoute');
const booking = require('./bookingRoute');

router.use('/', booking);
router.use('/admin', admin);

module.exports = router;
