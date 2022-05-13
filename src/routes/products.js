const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const controller = require('../controllers/products');

router.post('/', auth, admin, controller.createProduct);
router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);
router.put('/:id', auth, admin, controller.updateProduct);
router.delete('/:id', auth, admin, controller.deleteProduct);

module.exports = router;