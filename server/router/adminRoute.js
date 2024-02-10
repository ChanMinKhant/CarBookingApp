const router = require('express').Router();

const adminController = require('./../controller/adminController');
const { verifyJWT } = require('./../middleware/verifyJWT');

//verifyJWT
router.route('/login').post(adminController.login);
router.route('/isAdmin').get(verifyJWT, adminController.isAdmin);
router.route('/approve/:id/:token').patch(adminController.approveByEmail);
router.route('/cancel/:id/:token').patch(adminController.cancelByEmail);
router.route('/delete/:id/:token').delete(adminController.deleteByEmail);

module.exports = router;
