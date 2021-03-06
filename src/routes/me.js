const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/me');

router.get('/', auth, controller.getUser);
router.put('/', auth, controller.updateUser);

router.get('/cart', auth, controller.getCart);
router.put('/cart', auth, controller.updateCart);
router.put('/cart/add', auth, controller.addToCart);
router.put('/cart/empty', auth, controller.emptyCart);

router.post('/orders', auth, controller.placeOrder);
router.get('/orders', auth, controller.getOrders);

router.post('/reviews', auth, controller.createReview);
router.get('/reviews', auth, controller.getReviews);
router.put('/reviews/:id', auth, controller.updateReview);
router.delete('/reviews/:id', auth, controller.deleteReview);

module.exports = router;