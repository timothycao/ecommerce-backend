const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/carts');

router.post('/', auth, admin, controller.createCart);
router.get('/', auth, admin, controller.getCarts);
router.get('/:id', auth, admin, controller.getCart);
router.put('/:id', auth, admin, controller.updateCart);
router.delete('/:id', auth, admin, controller.deleteCart);

module.exports = router;