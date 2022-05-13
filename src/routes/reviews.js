const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/reviews');

router.post('/', auth, admin, controller.createReview);
router.get('/', controller.getReviews);
router.get('/:id', controller.getReview);
router.put('/:id', auth, admin, controller.updateReview);
router.delete('/:id', auth, admin, controller.deleteReview);

module.exports = router;