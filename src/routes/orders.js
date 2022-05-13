const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/orders');

router.post('/', auth, admin, controller.createOrder);
router.get('/', auth, admin, controller.getOrders);
router.get('/:id', auth, admin, controller.getOrder);
router.put('/:id', auth, admin, controller.updateOrder);
router.delete('/:id', auth, admin, controller.deleteOrder);

module.exports = router;