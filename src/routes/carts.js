const express = require('express');
const router = express.Router();
const controller = require('../controllers/carts');

router.post('/', controller.createCart);
router.get('/', controller.getCarts);
router.get('/:id', controller.getCart);
router.put('/:id', controller.updateCart);
router.delete('/:id', controller.deleteCart);

module.exports = router;