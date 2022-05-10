const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews');

router.post('/', controller.createReview);
router.get('/', controller.getReviews);
router.get('/:id', controller.getReview);
router.put('/:id', controller.updateReview);
router.delete('/:id', controller.deleteReview);

module.exports = router;